import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useTicketComments, TicketComment } from '@/hooks/useTickets';
import { format } from 'date-fns';
import { MessageSquare, User } from 'lucide-react';

interface CommentsSectionProps {
  ticketId: string;
}

export const CommentsSection = ({ ticketId }: CommentsSectionProps) => {
  const { comments, loading, addComment } = useTicketComments(ticketId);
  const [newComment, setNewComment] = useState('');
  const [commentBy, setCommentBy] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !commentBy.trim()) return;

    setSubmitting(true);
    try {
      await addComment(newComment, commentBy);
      setNewComment('');
      setCommentBy('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Existing Comments */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {loading ? (
            <p className="text-muted-foreground text-center py-4">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No comments yet</p>
          ) : (
            comments.map((comment: TicketComment) => (
              <div key={comment.id} className="p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">{comment.created_by}</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(comment.created_at), 'MMM d, yyyy h:mm a')}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{comment.comment}</p>
              </div>
            ))
          )}
        </div>

        {/* Add New Comment */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t">
          <div className="space-y-2">
            <Label htmlFor="commentBy">Your Name/Email *</Label>
            <Input
              id="commentBy"
              placeholder="Your name or email"
              value={commentBy}
              onChange={(e) => setCommentBy(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comment">Add Comment *</Label>
            <Textarea
              id="comment"
              placeholder="Type your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={submitting || !newComment.trim() || !commentBy.trim()}
            className="w-full"
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
