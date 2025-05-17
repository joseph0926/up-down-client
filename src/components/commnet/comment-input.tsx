'use client';

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAddComment } from '@/services/comment.query';

const schema = z.object({
  nickname: z.string().min(1, '닉네임 필수'),
  content: z.string().min(1, '내용을 입력하세요'),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  debateId: string;
  side: 'PRO' | 'CON';
  placeholder: string;
  scrollAnchor?: React.RefObject<HTMLDivElement>;
};

export function CommentInput({
  debateId,
  side,
  placeholder,
  scrollAnchor,
}: Props) {
  const addComment = useAddComment();
  const [sending, setSending] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { nickname: '', content: '' },
  });

  const onSubmit = async (values: FormValues) => {
    if (sending) return;
    setSending(true);
    try {
      await addComment.mutateAsync({
        debateId,
        side,
        nickname: values.nickname,
        content: values.content,
      });
      form.reset();
    } finally {
      setSending(false);
    }
  };

  return (
    <div ref={scrollAnchor} className="rounded-md border p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="별명" autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} placeholder={placeholder} rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={sending} className="w-full">
            {sending ? '등록 중…' : '댓글 등록'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
