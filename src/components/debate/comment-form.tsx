// ---------------------------------------------------------------------------
// File: /components/debate/comment-form.tsx (rewrite v2)
// ---------------------------------------------------------------------------
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { QUERY_KEY } from '@/lib/query-key';
import { cn } from '@/lib/utils';
import { createComment } from '@/services/comment.service';

export const CommentFormSchema = z.object({
  side: z.enum(['PRO', 'CON'], {
    required_error: '입장을 선택해 주세요',
  }),
  nickname: z.string().min(1, '닉네임을 입력해 주세요').max(20, '최대 20자'),
  content: z.string().min(1, '댓글을 입력해 주세요').max(300, '최대 300자'),
});
export type CommentFormValues = z.infer<typeof CommentFormSchema>;

export function CommentForm() {
  const { debateId } = useParams<{ debateId: string }>();
  const queryClient = useQueryClient();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: { side: undefined, nickname: '', content: '' },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createComment,
    onSuccess: async () => {
      toast.success('댓글이 등록되었습니다!');
      form.reset();
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.COMMENTS.ALL(debateId),
      });
    },
    onError: (err) => {
      toast.error(err?.message ?? '댓글 등록 중 오류가 발생했어요');
    },
  });

  const onSubmit = async (values: CommentFormValues) => {
    if (!debateId) return;
    await mutateAsync({ ...values, debateId });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 rounded-xl border bg-white p-4 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-800/40"
      >
        <FormField
          control={form.control}
          name="side"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block pb-1 text-sm font-medium">
                입장 선택
              </FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex gap-4"
                disabled={isPending}
              >
                <FormItem>
                  <FormControl>
                    <RadioGroupItem
                      value="PRO"
                      id="side-pro"
                      className={cn(
                        'peer',
                        'data-[state=checked]:border-blue-600',
                      )}
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor="side-pro"
                    className="cursor-pointer text-sm peer-data-[state=checked]:font-semibold peer-data-[state=checked]:text-blue-600"
                  >
                    찬성
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormControl>
                    <RadioGroupItem
                      value="CON"
                      id="side-con"
                      className={cn(
                        'peer',
                        'data-[state=checked]:border-red-600',
                      )}
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor="side-con"
                    className="cursor-pointer text-sm peer-data-[state=checked]:font-semibold peer-data-[state=checked]:text-red-600"
                  >
                    반대
                  </FormLabel>
                </FormItem>
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>닉네임</FormLabel>
              <FormControl>
                <Input
                  placeholder="최대 20자"
                  {...field}
                  disabled={isPending}
                />
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
              <FormLabel>댓글</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="최대 300자"
                  rows={4}
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? '등록 중…' : '댓글 등록'}
        </Button>
      </form>
    </Form>
  );
}
