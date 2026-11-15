import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { contactSchema, type ContactForm as FormValues } from '@/schemas'
import { submitContact } from '@/services/forms'
import { ApiError } from '@/services/api/client'
import { whatsappLink } from '@/config/agency'
import { Button } from '@/components/ui/Button'
import { Field, inputCls, SubmitState } from './Field'

export function ContactForm() {
  const { register, handleSubmit, reset, getValues, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(contactSchema) })
  const [state, setState] = useState<{ status: 'idle' | 'error' | 'success'; message: string }>({ status: 'idle', message: '' })
  const onSubmit = handleSubmit(async (v) => {
    setState({ status: 'idle', message: '' })
    try { await submitContact(v); setState({ status: 'success', message: 'Mensagem enviada. Respondemos assim que possível.' }); reset() }
    catch (e) { setState({ status: 'error', message: e instanceof ApiError ? e.message : 'Ocorreu um erro inesperado.' }) }
  })
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5" aria-busy={isSubmitting}>
      <Field id="c-name" label="Nome" error={errors.name?.message}><input id="c-name" autoComplete="name" className={inputCls} aria-invalid={!!errors.name} {...register('name')} /></Field>
      <Field id="c-email" label="Email" error={errors.email?.message}><input id="c-email" type="email" autoComplete="email" className={inputCls} aria-invalid={!!errors.email} {...register('email')} /></Field>
      <Field id="c-phone" label="Telefone" optional><input id="c-phone" type="tel" autoComplete="tel" className={inputCls} {...register('phone')} /></Field>
      <Field id="c-message" label="Mensagem" error={errors.message?.message}><textarea id="c-message" rows={5} className={inputCls} aria-invalid={!!errors.message} {...register('message')} /></Field>
      <div>
        <label className="flex items-start gap-3 text-sm"><input type="checkbox" className="mt-1 h-5 w-5 accent-[var(--color-sea)]" {...register('consent')} /><span>Aceito o tratamento dos meus dados para receber resposta a esta mensagem.</span></label>
        {errors.consent && <p role="alert" className="mt-1.5 text-sm text-red-700">{errors.consent.message}</p>}
      </div>
      <SubmitState status={state.status} message={state.message} whatsapp={state.status === 'error' ? whatsappLink(`Olá! ${getValues('message') ?? ''}`) : undefined} />
      <div><Button type="submit" variant="dark" disabled={isSubmitting}>{isSubmitting ? <><Loader2 className="animate-spin" size={18} aria-hidden /> A enviar…</> : 'Enviar mensagem'}</Button></div>
    </form>
  )
}
