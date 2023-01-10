import { Popover } from '@headlessui/react';
import React from 'react';
import {
  MdClose,
  MdDeleteOutline,
  MdLayersClear,
  MdQueueMusic,
} from 'react-icons/md';

const QueueControl = () => {
  return <div>queue</div>;
  // let [referenceElement, setReferenceElement] = React.useState<any>();
  // let [popperElement, setPopperElement] = React.useState<any>();
  // let { styles, attributes } = usePopper(referenceElement, popperElement);
  // const dispatch = useDispatch();
  // const queue = useSelector((state: RootState) => state.audio.playQueue);
  // return queue.length !== 0 ? (
  //     <Popover>
  //         <Popover.Button ref={setReferenceElement} className="p-1">
  //             <MdQueueMusic className="w-8 h-8 text-current text-gray-500 delay-100 hover:text-gray-700" />
  //         </Popover.Button>
  //         <Popover.Panel
  //             ref={setPopperElement}
  //             style={styles.popper}
  //             {...attributes.popper}
  //             className="pb-3 shadow"
  //         >
  //             {({ close }: any) => (
  //                 <div className="container flex flex-col items-center justify-center w-full mx-auto bg-white rounded-lg shadow dark:bg-gray-800">
  //                     <div className="items-center w-full p-4 text-center bg-indigo-100 dark:bg-gray-700">
  //                         <div className="flex items-center justify-between m">
  //                             <div className="flex items-center">
  //                                 <div className="flex flex-col">
  //                                     <span className="ml-2 font-bold text-gray-500 text-md dark:text-white">
  //                                         Up next....
  //                                     </span>
  //                                 </div>
  //                             </div>
  //                             <div className="flex flex-row items-center">
  //                                 <MiniActionButton
  //                                     tooltip="Clear queue"
  //                                     onClick={() => dispatch(clearQueue())}
  //                                 >
  //                                     <MdLayersClear />
  //                                 </MiniActionButton>
  //                                 <MiniActionButton
  //                                     tooltip="Close"
  //                                     onClick={() => close()}
  //                                 >
  //                                     <MdClose />
  //                                 </MiniActionButton>
  //                             </div>
  //                         </div>
  //                     </div>

  //                     <ul className="flex flex-col overflow-y-scroll max-h-120">
  //                         {queue.map((item) => (
  //                             <li
  //                                 className="flex flex-row"
  //                                 key={item.track.id}
  //                             >
  //                                 <div
  //                                     className="flex items-center flex-1 p-4 cursor-pointer select-none"
  //                                     onClick={() => {
  //                                         dispatch(play(item.track.id));
  //                                     }}
  //                                 >
  //                                     <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
  //                                         <a
  //                                             href="/fart/face"
  //                                             className="relative block"
  //                                         >
  //                                             <img
  //                                                 alt="profil"
  //                                                 src={item.album.smallImage}
  //                                                 className="object-cover w-10 h-10 mx-auto rounded-full "
  //                                             />
  //                                         </a>
  //                                     </div>
  //                                     <div className="flex-1 pl-1 mr-16">
  //                                         <div className="font-medium dark:text-white">
  //                                             {item.artist.name}
  //                                         </div>
  //                                         <div className="text-sm text-gray-600 dark:text-gray-200">
  //                                             {item.track.name}
  //                                         </div>
  //                                     </div>
  //                                     <button
  //                                         className="flex justify-end w-24 text-right"
  //                                         onClick={() =>
  //                                             dispatch(
  //                                                 removeFromQueue(
  //                                                     item.track.id
  //                                                 )
  //                                             )
  //                                         }
  //                                     >
  //                                         <MdDeleteOutline className="w-8 h-8" />
  //                                     </button>
  //                                 </div>
  //                             </li>
  //                         ))}
  //                     </ul>
  //                 </div>
  //             )}
  //         </Popover.Panel>
  //     </Popover>
  // ) : (
  //     <React.Fragment></React.Fragment>
  // );
};

export default QueueControl;
