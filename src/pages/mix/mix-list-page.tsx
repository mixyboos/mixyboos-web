import React from 'react'
import type { MixModel } from '@/lib/models/mix'
import ListAudioPlayer from '@/components/widgets/audio/list-audio-player'
import ProcessingMix from '@/components/mix/mix-process'

type MixListPageProps = {
  mixes: Array<MixModel> | undefined
}
const MixListPage: React.FC<MixListPageProps> = ({ mixes }) => {
  const [deletingIds, setDeletingIds] = React.useState<Set<string>>(new Set())

  if (!mixes || mixes.length === 0) {
    return <div className="text-center">No mixes found for this user...</div>
  }

  const handleDeleteStart = (mixId: string) => {
    setDeletingIds(prev => new Set(prev).add(mixId))
  }

  return (
    <div>
      {mixes.map((mix) => (
        <div 
          key={mix.id}
          className={`py-1 transition-all duration-300 ${
            deletingIds.has(mix.id) 
              ? 'opacity-0 scale-95 -translate-x-4' 
              : 'opacity-100 scale-100 translate-x-0'
          }`}
        >
          {mix.isProcessed ? (
            <ListAudioPlayer 
              mix={mix} 
              onDeleteStart={() => handleDeleteStart(mix.id)}
            />
          ) : (
            <ProcessingMix 
              mix={mix} 
              onDeleteStart={() => handleDeleteStart(mix.id)}
            />
          )}
        </div>
      ))}
    </div>
  )
}
export default MixListPage
