"use client"

import type React from "react"

import { useChat } from "ai/react"
import { useState, useRef, useEffect } from "react"
import {
  Send,
  Bot,
  User,
  Loader2,
  Search,
  Settings,
  X,
  Smile,
  Copy,
  Check,
  RefreshCw,
  Download,
  Clock,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useTheme } from "next-themes"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus, prism } from "react-syntax-highlighter/dist/esm/styles/prism"

// Real conversation history
const CONVERSATION_HISTORY = [
  { id: "conv1", title: "Web Development Help", date: "2 hours ago", preview: "How do I create a responsive layout?" },
  { id: "conv2", title: "JavaScript Debugging", date: "1 day ago", preview: "Why is my function returning undefined?" },
  { id: "conv3", title: "CSS Animation Ideas", date: "Yesterday", preview: "What are some creative CSS animations?" },
  {
    id: "conv4",
    title: "React State Management",
    date: "3 days ago",
    preview: "Redux vs Context API for state management",
  },
]

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState("gpt-4o")
  const [showSettings, setShowSettings] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [activeConversation, setActiveConversation] = useState("current")
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const { theme } = useTheme()
  const { toast } = useToast()

  // User settings
  const [settings, setSettings] = useState({
    autoScroll: true,
    codeHighlighting: true,
    messageSound: true,
    showTimestamps: true,
    fontSize: "medium",
  })

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && settings.autoScroll) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [settings.autoScroll])

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copiedIndex !== null) {
      const timer = setTimeout(() => {
        setCopiedIndex(null)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [copiedIndex])

  const handleCopyMessage = (index: number, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedIndex(index)
    toast({
      title: "Copied to clipboard",
      description: "Message content has been copied to your clipboard.",
      duration: 2000,
    })
  }

  const handleNewChat = () => {
    setMessages([])
    setActiveConversation("current")
    toast({
      title: "New conversation started",
      description: "Your previous conversation has been saved.",
      duration: 2000,
    })
  }

  const handleSaveConversation = () => {
    toast({
      title: "Conversation saved",
      description: "Your conversation has been saved to history.",
      duration: 2000,
    })
  }

  const handleDeleteConversation = () => {
    toast({
      title: "Conversation deleted",
      description: "The conversation has been removed from history.",
      duration: 2000,
    })
  }

  const handleEmojiSelect = (emoji: string) => {
    handleInputChange({ target: { value: input + emoji } } as React.ChangeEvent<HTMLInputElement>)
    setIsEmojiPickerOpen(false)
  }

  const getCodeLanguage = (className: string) => {
    const match = /language-(\w+)/.exec(className || "")
    return match ? match[1] : ""
  }

  const formatTimestamp = () => {
    const now = new Date()
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!mounted) return null

  return (
    <>
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-80 border-r bg-card hidden md:flex flex-col">
          <div className="p-4 border-b">
            <Button variant="default" className="w-full justify-start gap-2" onClick={handleNewChat}>
              <RefreshCw size={16} />
              New Chat
            </Button>
          </div>

          <Tabs defaultValue="history" className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-2 mx-4 mt-4">
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="flex-1 p-0">
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search conversations..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <ScrollArea className="flex-1 px-4 pb-4">
                <div className="space-y-2">
                  {CONVERSATION_HISTORY.filter(
                    (conv) =>
                      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      conv.preview.toLowerCase().includes(searchQuery.toLowerCase()),
                  ).map((conv) => (
                    <div
                      key={conv.id}
                      className="p-3 rounded-md hover:bg-accent cursor-pointer transition-colors"
                      onClick={() => setActiveConversation(conv.id)}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm">{conv.title}</h3>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Download size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleDeleteConversation()}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{conv.preview}</p>
                      <div className="flex items-center mt-2 gap-2">
                        <Clock size={12} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{conv.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="saved" className="flex-1 p-4">
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">No saved conversations</h3>
                <p className="text-sm text-muted-foreground">Save important conversations for quick access later.</p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="p-4 border-t">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full mt-2 justify-start gap-2" onClick={() => setShowSettings(true)}>
              <Settings size={16} />
              Settings
            </Button>
          </div>
        </div>

        {/* Mobile sidebar drawer */}
        <Drawer open={showHistory} onOpenChange={setShowHistory}>
          <DrawerContent className="max-h-[85vh]">
            <DrawerHeader>
              <DrawerTitle>Conversation History</DrawerTitle>
              <DrawerDescription>View and manage your past conversations</DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <Input
                type="search"
                placeholder="Search conversations..."
                className="mb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="space-y-2">
                {CONVERSATION_HISTORY.filter(
                  (conv) =>
                    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    conv.preview.toLowerCase().includes(searchQuery.toLowerCase()),
                ).map((conv) => (
                  <div
                    key={conv.id}
                    className="p-3 rounded-md hover:bg-accent cursor-pointer transition-colors border"
                    onClick={() => {
                      setActiveConversation(conv.id)
                      setShowHistory(false)
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-sm">{conv.title}</h3>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Download size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleDeleteConversation()}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{conv.preview}</p>
                    <div className="flex items-center mt-2 gap-2">
                      <Clock size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{conv.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>

        {/* Settings dialog */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Chat Settings</DialogTitle>
              <DialogDescription>Customize your chat experience</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-scroll">Auto-scroll to bottom</Label>
                  <p className="text-xs text-muted-foreground">Automatically scroll to the latest message</p>
                </div>
                <Switch
                  id="auto-scroll"
                  checked={settings.autoScroll}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoScroll: checked })}
                />
              </div>

              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="code-highlighting">Code syntax highlighting</Label>
                  <p className="text-xs text-muted-foreground">Highlight code blocks for better readability</p>
                </div>
                <Switch
                  id="code-highlighting"
                  checked={settings.codeHighlighting}
                  onCheckedChange={(checked) => setSettings({ ...settings, codeHighlighting: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="message-sound">Message sounds</Label>
                  <p className="text-xs text-muted-foreground">Play sound when messages are sent or received</p>
                </div>
                <Switch
                  id="message-sound"
                  checked={settings.messageSound}
                  onCheckedChange={(checked) => setSettings({ ...settings, messageSound: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-timestamps">Show timestamps</Label>
                  <p className="text-xs text-muted-foreground">Display time for each message</p>
                </div>
                <Switch
                  id="show-timestamps"
                  checked={settings.showTimestamps}
                  onCheckedChange={(checked) => setSettings({ ...settings, showTimestamps: checked })}
                />
              </div>
              <Separator />
              <div className="space-y-1.5">
                <Label htmlFor="font-size">Font size</Label>
                <Select
                  value={settings.fontSize}
                  onValueChange={(value) => setSettings({ ...settings, fontSize: value })}
                >
                  <SelectTrigger id="font-size">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          {/* Mobile header */}
          <div className="border-b p-2 flex items-center justify-between md:hidden">
            <Button variant="outline" size="icon" onClick={() => setShowHistory(true)}>
              <Clock size={18} />
            </Button>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-normal">
                {selectedModel}
              </Badge>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            </div>
            <Button variant="outline" size="icon" onClick={() => setShowSettings(true)}>
              <Settings size={18} />
            </Button>
          </div>

          {/* Search overlay */}
          {isSearchOpen && (
            <div className="absolute top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm p-4 border-b flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search in conversation..." className="flex-1" autoFocus />
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Chat messages */}
          <div
            className={cn(
              "flex-1 overflow-y-auto p-4 space-y-6",
              settings.fontSize === "small" && "text-sm",
              settings.fontSize === "large" && "text-lg",
            )}
          >
            <AnimatePresence initial={false}>
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center h-full text-center p-8"
                >
                  <div className="rounded-full bg-primary/10 p-6 mb-4">
                    <Bot size={32} className="text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">How can I help you today?</h2>
                  <p className="text-muted-foreground max-w-md mb-8">
                    Ask me anything! I can help with coding, answer questions, generate creative content, and more.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                    {[
                      { title: "Explain React hooks", icon: <RefreshCw size={16} /> },
                      { title: "Write a poem about coding", icon: <Smile size={16} /> },
                      { title: "Help debug my JavaScript", icon: <RefreshCw size={16} /> },
                      { title: "Design a database schema", icon: <RefreshCw size={16} /> },
                    ].map((suggestion, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="justify-start gap-2 h-auto py-3"
                        onClick={() => {
                          handleInputChange({
                            target: { value: suggestion.title },
                          } as React.ChangeEvent<HTMLInputElement>)
                          setTimeout(() => {
                            const formEvent = { preventDefault: () => {} } as React.FormEvent<HTMLFormElement>
                            handleSubmit(formEvent)
                          }, 100)
                        }}
                      >
                        {suggestion.icon}
                        <span className="text-left">{suggestion.title}</span>
                      </Button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={cn(
                      "group relative flex gap-3 max-w-3xl",
                      message.role === "user" ? "ml-auto" : "mr-auto",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm",
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      {message.role === "user" ? <User size={16} /> : <Bot size={16} />}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{message.role === "user" ? "You" : "AI Assistant"}</span>
                        {settings.showTimestamps && (
                          <span className="text-xs text-muted-foreground">{formatTimestamp()}</span>
                        )}
                      </div>

                      <div
                        className={cn(
                          "rounded-lg px-4 py-3",
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                        )}
                      >
                        {settings.codeHighlighting && message.role === "assistant" ? (
                          <ReactMarkdown
                            components={{
                              code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || "")
                                return !inline && match ? (
                                  <SyntaxHighlighter
                                    style={theme === "dark" ? vscDarkPlus : prism}
                                    language={getCodeLanguage(className || "")}
                                    PreTag="div"
                                    {...props}
                                  >
                                    {String(children).replace(/\n$/, "")}
                                  </SyntaxHighlighter>
                                ) : (
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                )
                              },
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        ) : (
                          <div className="whitespace-pre-wrap">{message.content}</div>
                        )}
                      </div>

                      {/* Message actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => handleCopyMessage(index, message.content)}
                              >
                                {copiedIndex === index ? <Check size={14} /> : <Copy size={14} />}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{copiedIndex === index ? "Copied!" : "Copy message"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {message.role === "assistant" && (
                          <>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7">
                                    <RefreshCw size={14} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Regenerate response</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={handleSaveConversation}
                                  >
                                    <Download size={14} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Save response</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="relative">
                <Textarea
                  value={input}
                  onChange={handleInputChange as any}
                  placeholder="Type your message..."
                  className="min-h-[80px] resize-none pr-20 pl-4 py-3"
                  disabled={isLoading}
                />
                <div className="absolute right-2 bottom-2 flex items-center gap-1">
                  {/* <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setIsSearchOpen(true)}
                        >
                          <Search size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Search in conversation</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider> */}

                  <DropdownMenu open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
                    <DropdownMenuTrigger asChild>
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                        <Smile size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="p-2">
                      <div className="grid grid-cols-8 gap-2">
                        {[
                          "😊",
                          "👍",
                          "🎉",
                          "🤔",
                          "😂",
                          "❤️",
                          "👏",
                          "🔥",
                          "✅",
                          "⭐",
                          "🚀",
                          "💡",
                          "📝",
                          "🤖",
                          "💻",
                          "👨‍💻",
                        ].map((emoji) => (
                          <Button
                            key={emoji}
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handleEmojiSelect(emoji)}
                          >
                            {emoji}
                          </Button>
                        ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    type="submit"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    disabled={isLoading || !input.trim()}
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-normal">
                    {selectedModel}
                  </Badge>
                </div>
                <Button type="button" variant="ghost" size="sm" className="text-xs" onClick={handleNewChat}>
                  <RefreshCw size={12} className="mr-1" />
                  New Chat
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}

