"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PawsightLogo } from "@/components/icons";
import { cn } from "@/lib/utils";
import { SendHorizonal, Bot } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

const starterQuestions = [
    "What should I do right now?",
    "Is this limping serious?",
    "How can I help him relax?",
];

export default function ChatPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Pawsight AI assistant. How can I help you with your recent analysis?",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  const handleSendMessage = (text: string) => {
    if (text.trim() === "") return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: `Based on the report (ID: ${params.id}), your dog seems playful. A good response to "${text}" would be to engage in some light activity. Have you tried playing fetch?`,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col md:h-[calc(100vh-8rem)]">
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3",
                message.sender === "user" && "flex-row-reverse"
              )}
            >
              <Avatar className="h-8 w-8">
                {message.sender === "bot" ? (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Bot className="h-5 w-5" />
                  </div>
                ) : (
                  <>
                    <AvatarImage src="https://picsum.photos/seed/user/100/100" />
                    <AvatarFallback>U</AvatarFallback>
                  </>
                )}
              </Avatar>
              <div
                className={cn(
                  "max-w-xs rounded-2xl px-4 py-3 md:max-w-md",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex items-start gap-3">
                 <Avatar className="h-8 w-8">
                     <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Bot className="h-5 w-5" />
                    </div>
                 </Avatar>
                 <div className="bg-muted rounded-2xl px-4 py-3 flex items-center gap-1">
                    <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></span>
                 </div>
             </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>
      </div>
      <div className="border-t bg-background p-4 md:p-6">
        <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex gap-2 flex-wrap">
                {starterQuestions.map(q => (
                    <Button key={q} variant="outline" size="sm" onClick={() => handleSendMessage(q)}>{q}</Button>
                ))}
            </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="flex items-center gap-2"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a follow-up question..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isTyping}>
              <SendHorizonal className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
