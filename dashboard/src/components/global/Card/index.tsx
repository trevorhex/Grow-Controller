import MuiCard, { CardProps as MuiCardProps } from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

export interface CardProps extends MuiCardProps {
  title?: string
}

export default function Card({ children, title, ...props }: CardProps) {
  return (
    <MuiCard {...props}>
      {title && <CardHeader title={title} />}
      <CardContent>{children}</CardContent>
    </MuiCard>
  )
}