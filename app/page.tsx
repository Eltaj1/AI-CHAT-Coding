"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { Code, Terminal, Search, BarChart2, Users, Zap, Globe, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRef } from "react"

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-block mb-8"
          >
            <Code size={80} className="text-black dark:text-white" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Free Open Source AI Assistant</h1>
          <p className="text-xl md:text-2xl mb-8">Your Open Source Coding Companion</p>
          <Link href="/chat">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200">
              Start
            </Button>
          </Link>
        </motion.div>
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute inset-0 bg-[url('/coding-bg.jpg')] bg-cover bg-center filter grayscale" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4" ref={targetRef}>
        <motion.div style={{ opacity, scale }} className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Open Source AI Code Generation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code size={40} />,
                title: "Free Code Generation",
                description: "Generate code snippets and solutions completely free, forever.",
              },
              {
                icon: <Zap size={40} />,
                title: "Fast & Efficient",
                description: "Get instant code suggestions and implementations for your projects.",
              },
              {
                icon: <Terminal size={40} />,
                title: "Multiple Languages",
                description: "Support for all major programming languages and frameworks.",
              },
              {
                icon: <BarChart2 size={40} />,
                title: "Detailed Code Metrics",
                description: "Access in-depth statistics and performance insights for your codebase.",
              },
              {
                icon: <Users size={40} />,
                title: "Developer Collaboration",
                description: "Facilitate seamless teamwork with integrated collaboration tools.",
              },
              {
                icon: <Globe size={40} />,
                title: "Global Repository Integration",
                description: "Connect with repositories worldwide for a unified coding experience.",
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-black p-6 rounded-lg hover:bg-white dark:hover:bg-black transition-colors"
              >
                <div className="mb-4 text-black dark:text-white">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-black dark:text-white">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Simple to Use
          </h2>
          <div className="space-y-12">
            {[
              {
                step: 1,
                title: "Describe Your Need",
                description: "Tell the AI what code you need or what problem you're trying to solve.",
              },
              {
                step: 2,
                title: "Get Generated Code",
                description: "Receive ready-to-use code snippets generated by our open-source AI.",
              },
              {
                step: 3,
                title: "Implement & Customize",
                description: "Use the generated code in your project and modify it as needed.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white dark:bg-black text-black dark:text-white flex items-center justify-center font-bold text-xl mr-4">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-black dark:text-white">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Start Coding with AI
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl mb-8"
          >
            Free and open source forever.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/chat">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                Get Started Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
