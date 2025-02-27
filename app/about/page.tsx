import { Bot, Zap, Moon, Sparkles } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">About AI Chat</h1>
        <p className="text-xl text-muted-foreground">
          Our AI Chat application combines cutting-edge AI technology with a beautiful, user-friendly interface to
          provide an exceptional chat experience.
        </p>

        <div className="grid gap-8 mt-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              Advanced AI Technology
            </h2>
            <p className="text-muted-foreground">
              Powered by state-of-the-art language models, our AI chat assistant can understand complex queries, provide
              detailed responses, and engage in natural conversations. The AI is constantly learning and improving to
              provide better assistance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Moon className="h-6 w-6 text-primary" />
              Beautiful Dark Mode
            </h2>
            <p className="text-muted-foreground">
              Our application features a carefully designed dark mode that reduces eye strain during extended use. The
              interface automatically adapts to your system preferences or can be manually toggled to suit your needs.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Smooth Animations
            </h2>
            <p className="text-muted-foreground">
              Enjoy a delightful user experience with smooth, subtle animations throughout the interface. From message
              transitions to interactive elements, every animation is designed to enhance usability without being
              distracting.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              Real-time Responses
            </h2>
            <p className="text-muted-foreground">
              Experience the power of real-time streaming technology that delivers AI responses as they're generated,
              creating a more natural conversation flow. No more waiting for complete responses before seeing any
              feedback.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

