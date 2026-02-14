import { Zap } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../configs/api";

// Standard type for Razorpay on window
declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function Pricing() {
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const plans = [
        {
            id: "Free",
            name: "Free",
            price: 0,
            desc: "Perfect for testing the waters",
            features: [
                "25 Credits per month",
                "Access to basic styles",
                "Standard generation speed",
                "720p resolution"
            ]
        },
        {
            id: "Go",
            name: "Go",
            price: 399,
            desc: "For creators starting their journey",
            features: [
                "50 Credits per month",
                "Access to all premium styles",
                "No watermarks",
                "1080p High-def resolution",
                "Priority generation queue",
                "Commercial usage rights"
            ]
        },
        {
            id: "Plus",
            name: "Plus",
            price: 1999,
            popular: true,
            desc: "Best for growing channels",
            features: [
                "500 Credits per month",
                "4K Ultra-HD resolution",
                "AI Prompt Enhancement",
                "Faster generation speed",
                "Priority support",
                "Save & organize history"
            ]
        },
        {
            id: "Pro",
            name: "Pro",
            price: 19900,
            desc: "For professional content studios",
            features: [
                "5000 Credits per month",
                "Highest quality mode",
                "Bulk generation tools",
                "Early access to new models",
                "API Access (Beta)",
                "Dedicated email support"
            ]
        }
    ];

    const businessPlans = [
        {
            id: "Team",
            name: "Team",
            price: 6999,
            popular: true,
            desc: "Collaborate with your creative team",
            features: [
                "2000 Credits per month",
                "Team dashboard & management",
                "Shared asset library",
                "Centralized billing",
                "Priority Support",
                "Commercial license for teams"
            ]
        },
        {
            id: "Enterprise",
            name: "Enterprise",
            price: 49900,
            desc: "Scale your thumbnail operations",
            features: [
                "15,000 Credits per month",
                "Custom style fine-tuning",
                "SSO & Enterprise security",
                "Dedicated Account Manager",
                "SLA & Uptime guarantees",
                "Onboarding & training"
            ]
        }
    ];

    const [isBusiness, setIsBusiness] = useState(false);

    // Helper to load Razorpay script
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (planId: string) => {
        if (!isLoggedIn) {
            toast.error("Please login to upgrade");
            navigate("/login");
            return;
        }

        setLoading(true);
        try {
            // Load Razorpay Script if not already loaded
            if (!window.Razorpay) {
                const res = await loadRazorpayScript();
                if (!res) {
                    toast.error("Razorpay SDK failed to load. Are you online?");
                    return;
                }
            }

            // Create Order
            const { data: orderData } = await api.post(`/api/payment/create-order`, { planId });

            if (!orderData.success) {
                toast.error(orderData.message || "Failed to initiate payment");
                setLoading(false);
                return;
            }

            if (orderData.amount === 0) {
                toast.success("Welcome to Free Plan!");
                setLoading(false);
                return;
            }

            // Open Razorpay
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || '', // Needs to be in .env
                amount: orderData.order.amount,
                currency: orderData.order.currency,
                name: "Thumblify",
                description: `Upgrade to ${planId} Plan`,
                order_id: orderData.order.id,
                handler: async function (response: any) {
                    try {
                        const { data: verifyData } = await api.post(`/api/payment/verify-payment`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            planId
                        });

                        if (verifyData.success) {
                            toast.success("Payment Successful! Plan Upgraded.");
                            // Refresh page or update context to show new credits/plan
                            navigate("/");
                            window.location.reload();
                        } else {
                            toast.error("Payment Verification Failed");
                        }
                    } catch (error) {
                        console.error(error);
                        toast.error("Payment Verification Error");
                    }
                },
                theme: {
                    color: "#db2777"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Payment Error:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-16 overflow-hidden">

            {/* Header */}
            <div className="text-center mb-16 relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Upgrade your plan</h1>
                <div className="inline-flex items-center bg-white/10 rounded-full p-1 border border-white/10">
                    <button
                        onClick={() => setIsBusiness(false)}
                        className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${!isBusiness ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        Personal
                    </button>
                    <button
                        onClick={() => setIsBusiness(true)}
                        className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${isBusiness ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        Business
                    </button>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
                {(isBusiness ? businessPlans : plans).map((plan) => (
                    <div key={plan.id} className={`relative rounded-3xl p-8 flex flex-col h-full border ${plan.popular ? 'border-pink-500 bg-pink-900/10' : 'border-white/10 bg-white/5'} hover:border-pink-500/50 transition-colors duration-300`}>
                        {plan.popular && (
                            <span className="absolute top-6 right-6 text-xs font-bold text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full uppercase tracking-wider">Popular</span>
                        )}

                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-4xl font-bold">₹{plan.price.toLocaleString()}</span>
                                <span className="text-gray-400 text-sm">/ month</span>
                            </div>
                            {plan.price > 0 && <p className="text-xs text-gray-500">(inclusive of GST)</p>}
                            <p className="text-gray-400 mt-4 text-sm min-h-[40px]">{plan.desc}</p>
                        </div>

                        <button
                            onClick={() => plan.id === user?.plan ? null : handlePayment(plan.id)}
                            disabled={loading || plan.id === user?.plan}
                            className={`w-full py-3 rounded-full font-semibold transition-all mb-8 ${plan.popular
                                ? 'bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-600/20'
                                : 'bg-white text-black hover:bg-gray-200'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {plan.id === user?.plan ? "Your Current Plan" : `Upgrade to ${plan.id}`}
                        </button>

                        <div className="space-y-4 flex-grow">
                            {plan.features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                    <Zap size={16} className={`shrink-0 mt-0.5 ${plan.popular ? 'text-pink-400' : 'text-gray-500'}`} />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        {plan.id === "Free" && (
                            <div className="mt-8 text-xs text-gray-500 text-center">
                                Have an existing plan? See billing help
                            </div>
                        )}
                        {plan.id === "Go" && (
                            <div className="mt-8 text-xs text-gray-500 text-center">
                                This plan may include ads. Learn more
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
