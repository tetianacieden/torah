"use client";

import { DragDropContext, DragDropContextProps } from 'react-beautiful-dnd';

export function DragDropProvider({ children, ...props }: DragDropContextProps) {
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  return <DragDropContext {...props}>{children}</DragDropContext>;
} 