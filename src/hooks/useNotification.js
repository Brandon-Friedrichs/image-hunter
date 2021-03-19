import React, { useState } from 'react'
import useTimedToggle from './useTimedToggle';

export default function useNotification(initialContent, interval) {
  const [content, setContent] = useState(initialContent);
  const [open, toggle] = useTimedToggle(interval);

  return [content, setContent, open, toggle];
}
