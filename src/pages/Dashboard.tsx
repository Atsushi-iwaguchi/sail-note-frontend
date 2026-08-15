import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ClipboardPen, Trophy, Target, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MenuItems = [
  {
    path: "/practice-records",
    label: "練習記録",
    description: "日々の記録を作成・確認",
    icon: ClipboardPen,
  },
  {
    path: "/tournaments",
    label: "過去の大会",
    description: "過去に参加した大会を確認",
    icon: Trophy,
  },
  {
    path: "/monthly-goals",
    label: "月目標",
    description: "今月の目標を設定・確認",
    icon: Target,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f4f9ff]">
      <Header />

      <main className="mx-auto max-w-5xl px-5 pb-32">
        <section className="flex items-center justify-between py-10 sm:py-14">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              こんにちは！
            </h1>

            <p className="mt-4 text-lg text-slate-600 sm:text-xl">
              今日も良いセーリングを！
            </p>
          </div>

        </section>

        <div className="flex flex-col gap-6">
          {MenuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => navigate(item.path)}
                className="
                  flex
                  h-auto
                  w-full
                  items-center
                  justify-start
                  gap-5
                  rounded-3xl
                  bg-white
                  p-6
                  text-left
                  shadow-sm
                  transition
                  hover:bg-white
                  hover:shadow-md
                "
              >
                <div
                  className="
                    flex
                    size-20
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-50
                    text-[#064b87]
                  "
                >
                  <Icon className="size-10" />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-bold text-[#064b87]">
                    {item.label}
                  </h2>

                  <p className="mt-2 text-sm text-slate-600 sm:text-base">
                    {item.description}
                  </p>
                </div>

                <ChevronRight
                  className="
                    size-8
                    shrink-0
                    text-[#0066b3]
                  "
                />
              </Button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
