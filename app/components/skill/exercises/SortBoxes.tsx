"use client";

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface SortBoxesProps {
  items: string[];
  categories: string[];
  currentPlacements: Record<string, string[]>;
  onChange: (placements: Record<string, string[]>) => void;
  disabled?: boolean;
}

export function SortBoxes({ items, categories, currentPlacements, onChange, disabled = false }: SortBoxesProps) {
  const [mounted, setMounted] = useState(false);
  const [availableItems, setAvailableItems] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    setAvailableItems(
      items.filter(item => !Object.values(currentPlacements).flat().includes(item))
    );
  }, [items, currentPlacements]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    const sourceId = source.droppableId;
    const destId = destination.droppableId;

    // Moving within the same list
    if (sourceId === destId) {
      if (sourceId === 'available') {
        const newItems = Array.from(availableItems);
        const [removed] = newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, removed);
        setAvailableItems(newItems);
      } else {
        const newPlacements = { ...currentPlacements };
        const list = Array.from(currentPlacements[sourceId] || []);
        const [removed] = list.splice(source.index, 1);
        list.splice(destination.index, 0, removed);
        newPlacements[sourceId] = list;
        onChange(newPlacements);
      }
      return;
    }

    // Moving between lists
    if (sourceId === 'available') {
      // From available to category
      const newAvailable = Array.from(availableItems);
      const [removed] = newAvailable.splice(source.index, 1);
      setAvailableItems(newAvailable);

      const newPlacements = { ...currentPlacements };
      const destList = Array.from(currentPlacements[destId] || []);
      destList.splice(destination.index, 0, removed);
      newPlacements[destId] = destList;
      onChange(newPlacements);
    } else if (destId === 'available') {
      // From category to available
      const newPlacements = { ...currentPlacements };
      const sourceList = Array.from(currentPlacements[sourceId] || []);
      const [removed] = sourceList.splice(source.index, 1);
      newPlacements[sourceId] = sourceList;
      onChange(newPlacements);

      const newAvailable = Array.from(availableItems);
      newAvailable.splice(destination.index, 0, removed);
      setAvailableItems(newAvailable);
    } else {
      // Between categories
      const newPlacements = { ...currentPlacements };
      const sourceList = Array.from(currentPlacements[sourceId] || []);
      const [removed] = sourceList.splice(source.index, 1);
      newPlacements[sourceId] = sourceList;

      const destList = Array.from(currentPlacements[destId] || []);
      destList.splice(destination.index, 0, removed);
      newPlacements[destId] = destList;
      onChange(newPlacements);
    }
  };

  if (!mounted) return null;

  return (
    <div className="h-full flex flex-col">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Available Letters */}
        <div className="mb-8">
          <h4 className="text-base font-medium text-gray-700 mb-3">Available Letters</h4>
          <Droppable droppableId="available" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-4 bg-gray-50 rounded-lg flex flex-wrap gap-3"
              >
                {availableItems.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="w-12 h-12 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center text-lg font-hebrew cursor-move"
                      >
                        {item}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* Categories */}
        <div className="flex-1 grid grid-cols-2 gap-6">
          {categories.map((category) => (
            <div key={category} className="flex flex-col">
              <h4 className="text-base font-medium text-gray-700 mb-3">{category}</h4>
              <Droppable droppableId={category}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex-1 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex flex-wrap gap-3 min-h-[120px]">
                      {(currentPlacements[category] || []).map((item, index) => (
                        <Draggable key={item} draggableId={item} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="w-12 h-12 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center text-lg font-hebrew cursor-move"
                            >
                              {item}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}