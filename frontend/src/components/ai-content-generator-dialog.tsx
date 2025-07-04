"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { generateText } from "@/services/genai";

interface AIContentGeneratorDialogProps {
  onContentGenerated?: (content: string) => void;
  triggerText?: string;
  triggerVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  triggerSize?: "default" | "sm" | "lg" | "icon";
  triggerClassName?: string;
}

export function AIContentGeneratorDialog({
  onContentGenerated,
  triggerText = "✨ Generate Content",
  triggerVariant = "outline",
  triggerSize = "default",
  triggerClassName = "",
}: AIContentGeneratorDialogProps) {
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      return;
    }

    setIsGenerating(true);
    try {
      const response = await generateText(prompt);
      if (response.payload) {
        setGeneratedContent(response.payload.content);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (generatedContent) {
      try {
        await navigator.clipboard.writeText(generatedContent);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch {
        // Silently handle copy errors
      }
    }
  };

  const handleUseContent = () => {
    if (generatedContent && onContentGenerated) {
      onContentGenerated(generatedContent);
      setIsOpen(false); // Close dialog
      setPrompt(""); // Reset form
      setGeneratedContent("");
    }
  };

  const resetForm = () => {
    setPrompt("");
    setGeneratedContent("");
    setIsCopied(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          resetForm();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant={triggerVariant}
          size={triggerSize}
          className={`${triggerClassName}`}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {triggerText}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            AI Content Generator
          </DialogTitle>
          <DialogDescription>
            Generate high-quality content using artificial intelligence. Enter a
            prompt below to get started.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ai-prompt">Prompt</Label>
            <Textarea
              id="ai-prompt"
              placeholder="Enter a prompt to generate content for your blog post..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Content
              </>
            )}
          </Button>

          {generatedContent && (
            <div className="space-y-3">
              <Label>Generated Content</Label>
              <div className="relative">
                <Textarea
                  value={generatedContent}
                  readOnly
                  className="min-h-[150px] max-h-[200px] bg-gray-50 resize-none overflow-y-auto"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleCopy}
                    className="h-8 w-8 p-0"
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                {onContentGenerated && (
                  <Button onClick={handleUseContent} className="flex-1">
                    Use This Content
                  </Button>
                )}
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="flex-1"
                >
                  {isCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Content
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
