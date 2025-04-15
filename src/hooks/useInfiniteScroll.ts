// Отслеживаем появление последнего элемента в списке на странице(в зоне видимости)
import { useEffect, useRef } from 'react';

type UseInfiniteScrollProps = {
  hasMore: boolean;
  isLoading: boolean;
  onIntersect: () => void;
};

export const useInfiniteScroll = ({
  hasMore,
  isLoading,
  onIntersect
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observe = (node: Element | null) => {
    if (!node || isLoading || !hasMore) return;

    // Убираем существующий IntersectionObserver
    if (observerRef.current) observerRef.current.disconnect();

    // Создаём нового IntersectionObserver, который отслеживает появление последнего элемента
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      {
        root: null,
        rootMargin: '200px' // Подгрузка сработает немного раньше чем область видимости достигнет последний элемент
      }
    );

    // Запускаем observer, чтобы он следил за элементом
    observerRef.current.observe(node);
  };

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return observe;
};
