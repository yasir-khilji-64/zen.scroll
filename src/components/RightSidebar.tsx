import React from 'react';

export default function RightSidebar() {
  return (
    <section className="sticky right-0 top-0 flex h-auto w-[200px] flex-col justify-between overflow-auto max-xl:hidden">
      <div className="flex flex-1 flex-col items-end">
        <h3 className="text-lg font-medium">Suggested Spaces</h3>
      </div>
    </section>
  );
}
