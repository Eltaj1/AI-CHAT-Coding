import { Bot, Zap, Moon, Sparkles, Github, Lock, FileText } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">About AI Chat</h1>
        <p className="text-xl text-muted-foreground">
          Our AI Chat application combines cutting-edge AI technology with a beautiful, user-friendly interface to provide an exceptional chat experience.
        </p>

        <div className="grid gap-8 mt-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              Advanced AI Technology
            </h2>
            <p className="text-muted-foreground">
              Powered by state-of-the-art language models, our assistant can understand complex queries, provide detailed responses, and engage in natural conversations. It’s continuously learning to serve you better.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Moon className="h-6 w-6 text-primary" />
              Beautiful Dark Mode
            </h2>
            <p className="text-muted-foreground">
              Designed with a sleek dark theme, our app reduces eye strain and adapts to your system preferences—customizable to your liking.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Smooth Animations
            </h2>
            <p className="text-muted-foreground">
              Enjoy smooth, subtle animations that enhance usability and bring a delightful, interactive feel to every click and transition.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              Real-time Responses
            </h2>
            <p className="text-muted-foreground">
              Experience dynamic real-time streaming that delivers AI responses as they’re generated, making conversations feel natural and immediate.
            </p>
          </section>
        </div>

        <div className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Github className="h-6 w-6 text-primary" />
            Open Source & Community
          </h2>
          <p className="text-muted-foreground">
            This project is 100% open source. We welcome contributions, feedback, and improvements from the community.
          </p>
          <p className="text-muted-foreground">
            Explore our repository on GitHub, report issues, or fork the code to help us make AI Chat even better.
          </p>
        </div>

                {/* Privacy & Terms Section */}
                <section className="mt-12 space-y-6">
          <h2 className="text-3xl font-bold">Privacy & Terms</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <Lock className="h-6 w-6 text-primary" />
                Privacy Policy
              </h3>
              <p className="text-muted-foreground">
                We value your privacy. Our application collects minimal data strictly to enhance your experience. Your information is securely stored and never shared with third parties. As an open source project, you can inspect our code to see exactly how we handle your data.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Terms of Use
              </h3>
              <p className="text-muted-foreground">
                By using our application, you agree to our terms. This project is open source and community-driven—feel free to contribute, fork, or modify the code. Please use the app responsibly and review our guidelines for a smooth experience.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
