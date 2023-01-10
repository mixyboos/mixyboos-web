import { Popover } from '@headlessui/react';
import React from 'react';
import { MdVolumeOff, MdVolumeUp } from 'react-icons/md';

//TODO: Change this to use headless ui
import { usePopper } from 'react-popper';
import { useAudioStore } from '@lib/services/audio';
import { makeRangeMapper } from '@lib/services/utils/rangeUtils';
interface IVolumeControlProps {
  volume: number;
  onVolumeChanged: (volume: number) => void;
}
const VolumeControl = ({ volume, onVolumeChanged }: IVolumeControlProps) => {
  const muted = useAudioStore((state) => state.muted);
  const setMuted = useAudioStore((state) => state.setMuted);
  const toggleMuted = useAudioStore((state) => state.toggleMuted);

  const [isOpen, setIsOpen] = React.useState(false);

  let [referenceElement, setReferenceElement] = React.useState<any>();
  let [popperElement, setPopperElement] = React.useState<any>();
  let { styles, attributes } = usePopper(referenceElement, popperElement);

  const _handleVolumeClick = ($event: React.MouseEvent<HTMLDivElement>) => {
    let currentTargetRect = $event.currentTarget.getBoundingClientRect();
    const eventOffsetY = $event.pageY - currentTargetRect.top;
    let mapFn = makeRangeMapper(0, currentTargetRect.height, 100, 0);
    let volume = mapFn(eventOffsetY);
    if (volume >= 0 && volume <= 100) {
      setMuted(false);
      onVolumeChanged(volume / 100);
    }
  };

  return (
    <Popover>
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div onClick={() => toggleMuted()}>
          <Popover.Button
            ref={setReferenceElement}
            className="p-1"
          >
            {muted ? (
              <MdVolumeOff className="w-8 h-8 text-current text-gray-500 delay-100 hover:text-gray-700" />
            ) : (
              <MdVolumeUp className="w-8 h-8 text-current text-gray-500 delay-100 hover:text-gray-700" />
            )}
          </Popover.Button>
        </div>
        {isOpen && (
          <div>
            <Popover.Panel
              static
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className="shadow"
            >
              <div
                className="w-8 p-1 bg-gray-800 shadow-lg cursor-pointer h-52"
                onClick={_handleVolumeClick}
              >
                <span
                  className="absolute bottom-0 block w-1/2 ml-1 text-white align-middle bg-red-400 rounded "
                  style={{ height: `${volume * 100}%` }}
                ></span>
              </div>
            </Popover.Panel>
          </div>
        )}
      </div>
    </Popover>
  );
};

export default VolumeControl;
