"use client"

import { Minimize2, Square, X } from "lucide-react"
import { generateColumns } from "../lib/game-logic"

interface ExcelInterfaceProps {
  onGameOpen: () => void
}

export function ExcelInterface({ onGameOpen }: ExcelInterfaceProps) {
  const columns = generateColumns()

  return (
    <div className="min-h-[800px] bg-white overflow-hidden relative">
      {/* Title Bar */}
      <div className="bg-green-600 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white/20 rounded"></div>
          <span className="text-sm font-medium">Book1 - Excel</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-white/20 rounded">
            <Minimize2 size={14} />
          </button>
          <button className="p-1 hover:bg-white/20 rounded">
            <Square size={14} />
          </button>
          <button className="p-1 hover:bg-red-500 rounded">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="bg-gray-50 border-b border-gray-200 px-2 py-1">
        <div className="flex items-center gap-6 text-sm">
          <span className="text-green-600 font-medium">ファイル</span>
          <span className="hover:bg-gray-100 px-2 py-1 rounded">ホーム</span>
          <span className="hover:bg-gray-100 px-2 py-1 rounded">挿入</span>
          <span className="hover:bg-gray-100 px-2 py-1 rounded">ページレイアウト</span>
          <span className="hover:bg-gray-100 px-2 py-1 rounded">数式</span>
          <span className="hover:bg-gray-100 px-2 py-1 rounded">データ</span>
          <span className="hover:bg-gray-100 px-2 py-1 rounded">校閲</span>
          <span className="hover:bg-gray-100 px-2 py-1 rounded">表示</span>
          <span className="hover:bg-gray-100 px-2 py-1 rounded">チーム</span>
          <div className="ml-auto flex items-center gap-2">
            <input
              type="text"
              placeholder="実行したい操作を入力してください..."
              className="px-2 py-1 border border-gray-300 rounded text-xs w-48"
            />
            <span className="text-xs">サインイン</span>
            <span className="text-xs">共有</span>
          </div>
        </div>
      </div>

      {/* Ribbon Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 px-2 py-2">
        <div className="flex items-center gap-4">
          {/* Clipboard Section */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              <div className="w-8 h-6 bg-blue-100 border border-blue-300 rounded flex items-center justify-center">
                <span className="text-xs">📋</span>
              </div>
              <div className="text-xs">
                <div>貼り付け</div>
                <div className="text-gray-500">コピー</div>
                <div className="text-gray-500">書式のコピー/貼り付け</div>
              </div>
            </div>
            <span className="text-xs text-gray-600">クリップボード</span>
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          {/* Font Section */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <select className="text-xs border border-gray-300 rounded px-1 py-0.5">
                <option>游ゴシック</option>
              </select>
              <select className="text-xs border border-gray-300 rounded px-1 py-0.5">
                <option>11</option>
              </select>
              <div className="flex items-center gap-1">
                <button className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-xs font-bold">
                  B
                </button>
                <button className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-xs italic">
                  I
                </button>
                <button className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-xs underline">
                  U
                </button>
              </div>
            </div>
            <span className="text-xs text-gray-600">フォント</span>
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          {/* Alignment Section */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <button className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-xs">
                ≡
              </button>
              <button className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-xs">
                ≡
              </button>
              <button className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-xs">
                ≡
              </button>
            </div>
            <span className="text-xs text-gray-600">配置</span>
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          {/* Number Section */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="text-xs">%</span>
              <span className="text-xs">,</span>
              <span className="text-xs">00</span>
              <span className="text-xs">.0</span>
            </div>
            <span className="text-xs text-gray-600">数値</span>
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          {/* Styles Section */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <div className="px-2 py-1 bg-yellow-200 text-xs rounded">条件付き書式</div>
              <div className="px-2 py-1 bg-pink-200 text-xs rounded">悪い</div>
              <div className="px-2 py-1 bg-green-200 text-xs rounded">良い</div>
            </div>
            <span className="text-xs text-gray-600">スタイル</span>
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          {/* Cells Section */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <button className="text-xs border border-gray-300 rounded px-1 py-0.5">挿入</button>
              <button className="text-xs border border-gray-300 rounded px-1 py-0.5">削除</button>
              <button className="text-xs border border-gray-300 rounded px-1 py-0.5">書式</button>
            </div>
            <span className="text-xs text-gray-600">セル</span>
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          {/* Editing Section */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <button className="text-xs">Σ オート SUM</button>
              <button className="text-xs">フィル</button>
              <button className="text-xs">クリア</button>
              <button className="text-xs">並べ替えとフィルター</button>
              <button className="text-xs">検索と選択</button>
            </div>
            <span className="text-xs text-gray-600">編集</span>
          </div>
        </div>
      </div>

      {/* Name Box and Formula Bar */}
      <div className="bg-white border-b border-gray-200 px-2 py-1 flex items-center gap-2">
        <div className="flex items-center gap-2">
          <input type="text" value="N9" className="w-16 text-xs border border-gray-300 rounded px-1 py-0.5" readOnly />
          <span className="text-gray-400">✓</span>
          <span className="text-gray-400">✗</span>
          <span className="text-gray-400">fx</span>
        </div>
        <input type="text" className="flex-1 text-xs border-none outline-none" placeholder="" />
      </div>

      {/* Spreadsheet Grid */}
      <div className="flex-1 overflow-auto">
        <div className="flex">
          {/* Row Numbers */}
          <div className="bg-gray-100 border-r border-gray-300">
            <div className="w-12 h-6 border-b border-gray-300 bg-gray-200"></div>
            {Array.from({ length: 27 }, (_, i) => (
              <div
                key={i}
                className="w-12 h-6 border-b border-gray-300 flex items-center justify-center text-xs text-gray-600 bg-gray-100"
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="flex-1">
            {/* Column Headers */}
            <div className="flex bg-gray-100 border-b border-gray-300">
              {columns.map((col) => (
                <div
                  key={col}
                  className="w-20 h-6 border-r border-gray-300 flex items-center justify-center text-xs font-medium text-gray-700 bg-gray-200"
                >
                  {col}
                </div>
              ))}
            </div>

            {/* Grid Cells */}
            {Array.from({ length: 27 }, (_, rowIndex) => (
              <div key={rowIndex} className="flex">
                {columns.map((col, colIndex) => (
                  <div
                    key={`${col}${rowIndex + 1}`}
                    className={`w-20 h-6 border-r border-b border-gray-300 flex items-center justify-center text-xs cursor-pointer ${
                      col === "N" && rowIndex === 8 ? "bg-white border-2 border-green-500" : "bg-white hover:bg-gray-50"
                    } ${col === "A" && rowIndex === 1 ? "text-blue-600 font-medium hover:underline" : ""}`}
                    onClick={() => {
                      if (col === "A" && rowIndex === 1) {
                        onGameOpen()
                      }
                    }}
                  >
                    {col === "A" && rowIndex === 1 ? "2048" : ""}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-gray-100 border-t border-gray-300 px-2 py-1 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="bg-white border border-gray-300 rounded px-2 py-1 text-xs">Sheet1</div>
            <button className="w-4 h-4 border border-gray-300 rounded-full flex items-center justify-center text-xs">
              +
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <span>準備完了</span>
          <div className="flex items-center gap-1">
            <button>📊</button>
            <button>📈</button>
            <button>📋</button>
            <span>-</span>
            <span>🔍</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
