"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { useChat } from "ai/react";
import { ScrollArea } from "./ui/scroll-area";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat", // The API route created at [api/chat.ts](./api/chat.ts)
  });
  return (
    <Card className="w-[440px]">
      <CardHeader>
        <CardTitle>Chat AI</CardTitle>
        <CardDescription>A ChatBot Created with Vercel SDK</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full pr-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="flex gap-3 mb-4 text-sm text-slate-600"
            >
              {message.role === "user" && (
                <Avatar>
                  <AvatarFallback>HA</AvatarFallback>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/4060187?v=4" />
                </Avatar>
              )}
              {message.role === "assistant" && (
                <Avatar>
                  <AvatarFallback>AI</AvatarFallback>
                  <AvatarImage src="https://octodex.github.com/images/daftpunktocat-guy.gif" />
                </Avatar>
              )}
              <p className="pl-2 font-semibold leading-relaxed">
                <span className="block mb-1 text-slate-900">
                  {message.role === "user" ? "Human" : "AI"}:
                </span>
                {message.content}
              </p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className="flex w-full space-x-2" onSubmit={handleSubmit}>
          <Input
            placeholder="How can I help you Human?"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
