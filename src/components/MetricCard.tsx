import { Icon, type IconName } from './Icon'

interface MetricCardProps {
  icon: IconName
  label: string
  kind: 'sunrise' | 'sunset' | 'uv' | 'visibility'
  value: string
  detail?: string
}

export function MetricCard({ detail, icon, kind, label, value }: MetricCardProps) {
  return (
    <article className={`metric-card metric-card--${kind}`}>
      <span className="metric-card__label">{label}</span>
      <span className="metric-card__icon">
        <Icon name={icon} size={18} />
      </span>
      <strong>{value}</strong>
      {detail && <small>{detail}</small>}
      <span className="metric-card__visual" aria-hidden="true">
        <span />
      </span>
    </article>
  )
}
