import React from 'react'
import type { MixModel } from '@/lib/models/mix'
import ListAudioPlayer from '@/components/widgets/audio/list-audio-player'
import ProcessingMix from '@/components/mix/mix-process'

type MixListPageProps = {
  mixes: Array<MixModel> | undefined
}
const MixListPage: React.FC<MixListPageProps> = ({ mixes }) => {
  if (!mixes || mixes.length === 0) {
    return <div className="text-center">No mixes found for this user...</div>
  }
  return (
    <div>
      {mixes.map((mix) => (
        <div className="py-1" key={mix.id}>
          {mix.isProcessed ? (
            <ListAudioPlayer key={mix.id} mix={mix} />
          ) : (
            <ProcessingMix mix={mix} />
          )}
        </div>
      ))}
    </div>
  )
}
export default MixListPage
