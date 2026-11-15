import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { serviceRequestSchema, type ServiceRequestForm as FormValues } from '@/schemas'
import { submitServiceRequest } from '@/services/forms'
import { ApiError } from '@/services/api/client'
import { services } from '@/data/services'
import { whatsappLink } from '@/config/agency'
import { Button } from '@/components/ui/Button'
import { Field, inputCls, SubmitState } from './Field'
import type { ServiceId } from '@/types'

export function ServiceRequestForm({ defaultService, defaultDestination }: { defaultService?: ServiceId; defaultDestination?: string }) {
  const { register, handleSubmit, reset, getValues, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: { serviceType: defaultService, travelers: 1, residenceCountry: 'Angola', destinationCountry: defaultDestination ?? '' },
  })
  const [state, setState] = useState<{ status: 'idle' | 'error' | 'success'; message: string }>({ status: 'idle', message: '' })

  const onSubmit = handleSubmit(async (v) => {
    setState({ status: 'idle', message: '' })
    try {
      await submitServiceRequest(v)
      setState({ status: 'success', message: 'Pedido enviado. A equipa entrará em contacto consigo.' })
      reset()
    } catch (e) {
      setState({ status: 'error', message: e instanceof ApiError ? e.message : 'Ocorreu um erro inesperado. Tente novamente.' })
    }
  })

  const wa = () => {
    const v = getValues()
    return whatsappLink(`Olá! Gostaria de solicitar um serviço.\nNome: ${v.fullName || '-'}\nServiço: ${services.find((s) => s.id === v.serviceType)?.title ?? '-'}\nDestino: ${v.destinationCountry || '-'}\nViajantes: ${v.travelers || '-'}`)
  }
  const err = (k: keyof FormValues) => errors[k]?.message as string | undefined

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2" aria-busy={isSubmitting}>
      <Field id="fullName" label="Nome completo" error={err('fullName')}><input id="fullName" autoComplete="name" className={inputCls} aria-invalid={!!errors.fullName} {...register('fullName')} /></Field>
      <Field id="email" label="Email" error={err('email')}><input id="email" type="email" autoComplete="email" className={inputCls} aria-invalid={!!errors.email} {...register('email')} /></Field>
      <Field id="phone" label="Telefone" error={err('phone')}><input id="phone" type="tel" autoComplete="tel" className={inputCls} aria-invalid={!!errors.phone} {...register('phone')} /></Field>
      <Field id="residenceCountry" label="País de residência" error={err('residenceCountry')}><input id="residenceCountry" autoComplete="country-name" className={inputCls} aria-invalid={!!errors.residenceCountry} {...register('residenceCountry')} /></Field>
      <Field id="destinationCountry" label="País de destino" error={err('destinationCountry')}><input id="destinationCountry" className={inputCls} aria-invalid={!!errors.destinationCountry} {...register('destinationCountry')} /></Field>
      <Field id="serviceType" label="Tipo de serviço" error={err('serviceType')}>
        <select id="serviceType" className={inputCls} aria-invalid={!!errors.serviceType} {...register('serviceType')}>
          <option value="">Escolha um serviço</option>
          {services.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
        </select>
      </Field>
      <Field id="travelers" label="Número de viajantes" error={err('travelers')}><input id="travelers" type="number" min={1} className={inputCls} aria-invalid={!!errors.travelers} {...register('travelers', { valueAsNumber: true })} /></Field>
      <Field id="desiredDate" label="Data pretendida" optional><input id="desiredDate" type="date" className={inputCls} {...register('desiredDate')} /></Field>
      <div className="sm:col-span-2"><Field id="message" label="Mensagem adicional" optional error={err('message')}><textarea id="message" rows={4} className={inputCls} {...register('message')} /></Field></div>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm"><input type="checkbox" className="mt-1 h-5 w-5 accent-[var(--color-sea)]" aria-invalid={!!errors.consent} {...register('consent')} />
          <span>Aceito o tratamento dos meus dados pessoais para responder a este pedido, conforme a <a href="/privacidade" className="underline">política de privacidade</a>.</span></label>
        {errors.consent && <p role="alert" className="mt-1.5 text-sm text-red-700">{err('consent')}</p>}
      </div>
      <div className="grid gap-4 sm:col-span-2">
        <SubmitState status={state.status} message={state.message} whatsapp={state.status === 'error' ? wa() : undefined} />
        <div><Button type="submit" variant="dark" disabled={isSubmitting} className="w-full sm:w-auto">{isSubmitting ? <><Loader2 className="animate-spin" size={18} aria-hidden /> A enviar…</> : 'Enviar pedido'}</Button></div>
      </div>
    </form>
  )
}
