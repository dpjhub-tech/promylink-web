"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/auth-context";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { SupportTicket, SupportMessage } from "@/lib/support-types";
import {
  MessageSquare,
  Send,
  Plus,
  Loader2,
  ChevronDown,
  ChevronUp,
  Clock,
} from "lucide-react";

// Faithful port of Promylink/src/components/settings/SupportChatSection.tsx,
// backed by the new /support/tickets Nest module (support_tickets +
// support_messages tables) instead of direct Supabase table access — profile
// data now lives in local Postgres, not Supabase.
export function SupportChatSection() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [creating, setCreating] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchTickets = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await apiFetch<SupportTicket[]>("/support/tickets");
      setTickets(data);
    } catch {
      // stay quiet — empty state covers this
    }
    setLoading(false);
  };

  useEffect(() => { fetchTickets(); }, [user]);

  const loadMessages = async (ticketId: string) => {
    setMessagesLoading(true);
    try {
      const data = await apiFetch<SupportMessage[]>(`/support/tickets/${ticketId}/messages`);
      setMessages(data);
    } catch {
      setMessages([]);
    }
    setMessagesLoading(false);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleExpand = (ticketId: string) => {
    if (expandedId === ticketId) {
      setExpandedId(null);
      setMessages([]);
    } else {
      setExpandedId(ticketId);
      loadMessages(ticketId);
    }
    setReplyText("");
  };

  const handleCreateTicket = async () => {
    if (!newSubject.trim() || !newMessage.trim() || !user) return;
    setCreating(true);
    try {
      await apiFetch("/support/tickets", {
        method: "POST",
        body: JSON.stringify({ subject: newSubject.trim(), message: newMessage.trim() }),
      });
      setNewSubject("");
      setNewMessage("");
      setShowCreate(false);
      toast({ title: "Ticket created", description: "Our support team will respond shortly." });
      fetchTickets();
    } catch (err) {
      toast({ title: "Failed to create ticket", description: (err as Error).message, variant: "destructive" });
    }
    setCreating(false);
  };

  const handleSendReply = async (ticketId: string) => {
    if (!replyText.trim() || !user) return;
    setSendingReply(true);
    try {
      await apiFetch(`/support/tickets/${ticketId}/messages`, {
        method: "POST",
        body: JSON.stringify({ message: replyText.trim() }),
      });
      setReplyText("");
      loadMessages(ticketId);
    } catch (err) {
      toast({ title: "Failed to send", description: (err as Error).message, variant: "destructive" });
    }
    setSendingReply(false);
  };

  return (
    <div className="glass-card p-6 animate-fade-in mb-6" style={{ animationDelay: "0.15s" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Support Chat
        </h2>
        {user && (
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setShowCreate(!showCreate)}>
            <Plus className="h-3.5 w-3.5" />
            New Ticket
          </Button>
        )}
      </div>

      {!user ? (
        <p className="text-sm text-muted-foreground text-center py-6">
          Sign in to start a support conversation.
        </p>
      ) : (
        <>
          {showCreate && (
            <div className="space-y-3 mb-4 p-4 rounded-xl bg-secondary/50 border border-border animate-fade-in">
              <Input
                placeholder="Subject (e.g. Credits not added)"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                maxLength={200}
              />
              <Textarea
                placeholder="Describe your issue..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={3}
                maxLength={1000}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="gap-1.5"
                  onClick={handleCreateTicket}
                  disabled={creating || !newSubject.trim() || !newMessage.trim()}
                >
                  {creating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                  Submit Ticket
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowCreate(false)}>Cancel</Button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : tickets.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              No support tickets yet. Create one if you need help!
            </p>
          ) : (
            <div className="space-y-2">
              {tickets.map((ticket) => {
                const isExpanded = expandedId === ticket.id;
                return (
                  <div key={ticket.id} className="border border-border rounded-xl overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between p-3 hover:bg-secondary/50 transition-colors text-left"
                      onClick={() => handleExpand(ticket.id)}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm truncate">{ticket.subject}</span>
                          <Badge variant={ticket.status === "open" ? "default" : "secondary"} className="text-xs capitalize shrink-0">
                            {ticket.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(ticket.updatedAt).toLocaleString()}
                        </p>
                      </div>
                      {isExpanded ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
                    </button>

                    {isExpanded && (
                      <div className="border-t border-border p-3 space-y-3 animate-fade-in">
                        <div className="max-h-52 overflow-y-auto space-y-2 p-2 rounded-lg bg-background">
                          {messagesLoading ? (
                            <div className="flex justify-center py-4">
                              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                            </div>
                          ) : messages.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-4">No messages.</p>
                          ) : (
                            messages.map((msg) => (
                              <div
                                key={msg.id}
                                className={`p-2.5 rounded-lg text-sm max-w-[85%] ${
                                  msg.isStaff
                                    ? "bg-primary/10 border border-primary/20"
                                    : "ml-auto bg-secondary border border-border"
                                }`}
                              >
                                <p className="text-xs font-medium text-muted-foreground mb-0.5">
                                  {msg.isStaff ? "🛡️ Support" : "👤 You"}
                                  <span className="ml-2">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                                </p>
                                <p>{msg.message}</p>
                              </div>
                            ))
                          )}
                          <div ref={messagesEndRef} />
                        </div>

                        {ticket.status === "open" && (
                          <div className="flex gap-2">
                            <Textarea
                              placeholder="Type your message..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              rows={2}
                              className="text-sm flex-1"
                              maxLength={1000}
                            />
                            <Button
                              size="icon"
                              className="h-auto"
                              onClick={() => handleSendReply(ticket.id)}
                              disabled={sendingReply || !replyText.trim()}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        )}

                        {ticket.status === "closed" && (
                          <p className="text-xs text-muted-foreground text-center">This ticket has been closed by support.</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
