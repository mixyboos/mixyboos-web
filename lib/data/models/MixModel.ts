import { UserModel } from '.'

interface MixModel {
  id: string
  slug?: string
  title: string
  description: string
  image?: string
  audioUrl?: string
  user?: UserModel
}
export default MixModel
