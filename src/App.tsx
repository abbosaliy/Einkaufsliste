import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { toast } from 'sonner';
import { CiCircleCheck } from 'react-icons/ci';
import { HiArrowUturnRight, HiOutlineArchiveBox } from 'react-icons/hi2';

type Props = {
  id: number;
  name: string;
  quantity: number;
  bought: boolean;
};

function App() {
  const [produkt, setProdukt] = useState('');
  const [count, setCount] = useState(1);
  const [liste, setListe] = useState<Props[]>([]);

  const LOCAL_STORAGE_KEY = 'produktListe';

  useEffect(() => {
    const save = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (save) {
      setListe(JSON.parse(save));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(liste));
  }, [liste]);

  function addProdukt() {
    if (liste.find((item) => item.name === produkt)) {
      toast.error('Hinzufügen fehlgeschlagen', {
        description: 'Das Produkt ist bereits in der Einkaufsliste vorhanden.',
        action: {
          label: 'Löschen',
          onClick: () => {},
        },
      });

      return;
    }

    const newProdukt = {
      id: Date.now(),
      name: produkt,
      quantity: count,
      bought: false,
    };

    setListe([...liste, newProdukt]);
    setProdukt('');
    setCount(1);
  }

  function handleItem(id: number, value: boolean) {
    setListe((prev) => [
      ...prev.filter((item) => item.id !== id),
      { ...prev.find((item) => item.id === id)!, bought: value },
    ]);
  }

  function handleDelete(id: number) {
    setListe((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className=" w-full max-w-lg flex mx-auto flex-col items-center justify-center p-8 gap-10">
      <h2 className="text-4xl font-bold">Einkaufsliste</h2>
      <div className="w-full flex flex-col items-center p-2 gap-3">
        <div className="flex w-full gap-2">
          <Input
            className="w-full"
            placeholder="Produkt eingeben"
            value={produkt}
            onChange={(e) => setProdukt(e.target.value)}
          />
          <Input
            className="w-15"
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </div>

        <Button
          className="w-full"
          disabled={produkt.length < 1}
          onClick={addProdukt}
        >
          Eintrag Hinzufügen
        </Button>
      </div>

      <div className="w-full flex flex-col gap-2">
        {liste.map((item) => (
          <div
            key={item.id}
            className="w-full flex  p-5 items-center justify-between border-1 rounded-xl shadow-md "
          >
            <div className="flex flex-col">
              <h3
                className={`font-medium text-xl ${
                  item.bought ? 'line-through text-gray-400' : ''
                }`}
              >
                {item.name}
              </h3>
              <p className="text-black/40 flex gap-0.5">
                <span>Anzahl:</span>
                <span>{item.quantity}</span>
              </p>
            </div>

            {item.bought ? (
              <div className="flex items-center gap-1">
                <Button
                  size={'sm'}
                  variant={'outline'}
                  className="bg-red-600 hover:bg-red-500 hover:text-white text-white text-4xl"
                  onClick={() => handleDelete(item.id)}
                >
                  <HiOutlineArchiveBox className="size-6" />
                </Button>

                <Button
                  variant={'outline'}
                  onClick={() => handleItem(item.id, false)}
                >
                  <HiArrowUturnRight />
                  Zurück
                </Button>
              </div>
            ) : (
              <Button
                size={'lg'}
                variant={'outline'}
                className="duration-300"
                onClick={() => handleItem(item.id, true)}
              >
                <CiCircleCheck />
                Abhaken
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
