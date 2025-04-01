import { notFound } from 'next/navigation';

export default function TestPage() {
  notFound();
  return <p>Эта строка никогда не должна отображаться</p>;
}
