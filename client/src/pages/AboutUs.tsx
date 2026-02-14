import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Users, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 overflow-hidden">
            {/* Hero Section */}
            <section className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-12 md:py-20 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto z-10"
                >
                    <span className="text-pink-500 font-semibold tracking-wider uppercase text-sm mb-4 block">Our Story</span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        Revolutionizing Content Creation with <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">AI</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                        We're on a mission to empower creators with intelligent tools that turn ideas into captivating visuals in seconds.
                    </p>
                </motion.div>
                
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[100px] -z-0 pointer-events-none" />
            </section>

            {/* Mission Section */}
            <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-16 md:py-24 relative">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for Creators, by Creators</h2>
                        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                            Thumblify was born from a simple frustration: creating high-quality thumbnails takes too much time. We wanted to focus on creating content, not wrestling with design software.
                        </p>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Our AI-powered platform understands context, emotion, and viral trends, generating thumbnails that don't just look good—they click.
                        </p>
                        
                        <div className="space-y-4">
                            {[
                                "AI-Driven Design Intelligence",
                                "Lightning Fast Generation",
                                "Proven High CTR Templates"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="text-pink-500 size-5" />
                                    <span className="text-gray-200">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-8 relative">
                             <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-transparent" />
                             <div className="grid grid-cols-2 gap-4 h-full">
                                <div className="space-y-4 pt-8">
                                    <div className="h-32 bg-white/10 rounded-xl w-full animate-pulse" />
                                    <div className="h-48 bg-white/10 rounded-xl w-full" />
                                </div>
                                <div className="space-y-4">
                                    <div className="h-48 bg-white/10 rounded-xl w-full" />
                                    <div className="h-32 bg-white/10 rounded-xl w-full animate-pulse" />
                                </div>
                             </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-16 md:py-24 bg-white/5">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Core Values</h2>
                    <p className="text-gray-400 text-lg">
                        These principles guide every decision we make and every feature we build.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Zap className="size-8 text-yellow-400" />,
                            title: "Speed Matters",
                            desc: "We believe in workflows that flow. No waiting, no lag, just instant creativity."
                        },
                        {
                            icon: <Users className="size-8 text-blue-400" />,
                            title: "Community First",
                            desc: "We build what you need. Your feedback shapes our roadmap directly."
                        },
                        {
                            icon: <Shield className="size-8 text-green-400" />,
                            title: "Creator Trust",
                            desc: "Your content and data are yours. We provide the tools, you own the magic."
                        }
                    ].map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors"
                        >
                            <div className="bg-white/10 w-fit p-4 rounded-xl mb-6">
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {value.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

             {/* Team Stats / Info */}
             <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-16 md:py-24 border-b border-white/10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { number: "10k+", label: "Happy Creators" },
                        { number: "1M+", label: "Thumbnails Generated" },
                        { number: "99.9%", label: "Uptime" },
                        { number: "24/7", label: "Support" }
                    ].map((stat, index) => (
                        <motion.div
                             key={index}
                             initial={{ opacity: 0, scale: 0.9 }}
                             whileInView={{ opacity: 1, scale: 1 }}
                             viewport={{ once: true }}
                             transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-2">{stat.number}</h3>
                            <p className="text-gray-500 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
             <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-24 text-center">
                <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.6 }}
                     className="max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Create?</h2>
                    <p className="text-gray-400 text-lg mb-10">
                        Join thousands of creators who are already saving time and boosting views with Thumblify.
                    </p>
                    <Link to="/generate" className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105">
                        Start Generating Now
                        <ArrowRight size={20} />
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
