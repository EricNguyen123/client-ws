// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import { Plus } from 'lucide-react';
// import React, { useState } from 'react';

// type BoxButtonProps = {
//   render?: (toggle: () => void) => React.ReactNode;
// };

// export default function BoxButton({ render }: BoxButtonProps) {
//   const [open, setOpen] = useState<boolean>(false);

//   const handleToggle = () => {
//     setOpen((prev) => !prev);
//   };

//   return (
//     <>
//       {!open ? (
//         <div
//           className="w-[100px] h-[100px] flex items-center justify-center 
//                       border-dashed rounded-lg border-[1px] border-slate-400
//                       cursor-pointer bg-slate-50 hover:bg-accent"
//           onClick={handleToggle}
//         >
//           <div className="w-full p-2 h-full flex items-center justify-center">
//             <Plus className="w-[60%] h-[60%]" />
//           </div>
//         </div>
//       ) : (
//         render && render(handleToggle)
//       )}
//     </>
//   );
// }


'use client';

import { Plus } from 'lucide-react';
import React, { useState } from 'react';

type BoxButtonProps = {
  render?: (toggle: () => void) => React.ReactNode;
};

export default function BoxButton({ render }: BoxButtonProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-row items-center justify-start space-x-4">
      {!open ? (
        <div
          className="w-[100px] h-[100px] flex items-center justify-center 
                     border-dashed rounded-lg border-[1px] border-slate-400 dark:border-white
                     cursor-pointer bg-slate-50 dark:bg-transparent hover:bg-accent 
                     transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={handleToggle}
        >
          <div className="w-full p-2 h-full flex items-center justify-center">
            <Plus className="w-[60%] h-[60%]" />
          </div>
        </div>
      ) : (
        <div
          className="w-full bg-transparent
                     transition-all duration-300 ease-in-out animate-fade-in-down"
        >
          {render?.(handleToggle)}
        </div>
      )}
    </div>
  );
}
