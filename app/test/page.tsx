'use client';

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function FakePayPayPage() {
  const [passwordVerified, setPasswordVerified] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [stage, setStage] = useState<"initial" | "loading" | "received">("initial")
  const [amount, setAmount] = useState(5000)
  const [sender, setSender] = useState("ヤマダ タロウ")
  const [showSettings, setShowSettings] = useState(false)
  const router = useRouter()

  const handleReceive = () => {
    setStage("loading")
    setTimeout(() => {
      setStage("received")
    }, 1600)
  }

  if (!passwordVerified) {
    return (
      <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-sm w-full bg-white rounded-xl shadow-xl p-6 text-center"
        >
          <h1 className="text-xl font-bold mb-2 text-[#ff2d55]">注意と同意</h1>
          <p className="text-sm text-gray-600 mb-4">
            これはPayPayの本物のアプリではなく、ジョーク用途の模倣ツールです。
            詐欺・悪用を目的とした使用は禁止されています。
          </p>
          <div className="mb-4 flex items-center justify-center gap-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm text-gray-700">上記の内容に同意します</label>
          </div>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="パスワードを入力"
            className="w-full border rounded-lg px-4 py-2 mb-4"
          />
          <Button
            className="w-full bg-[#ff2d55] text-white rounded-full py-2 font-semibold"
            onClick={() => {
              if (passwordInput === "hisashi" && agreed) {
                setPasswordVerified(true)
              } else if (!agreed) {
                alert("同意が必要です")
              } else {
                alert("パスワードが違います")
              }
            }}
          >
            同意して開始
          </Button>
          <div className="mt-4">
            <Button
              variant="ghost"
              className="text-gray-500 text-sm"
              onClick={() => router.push("/")}
            >
              トップページに戻る
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#fff5f5] to-[#ffeaea] text-black font-sans relative overflow-hidden">
      <div className="bg-[#ff2d55] px-4 py-3 flex items-center justify-between text-white shadow-md">
        <div className="flex items-center">
          <ChevronLeft className="w-6 h-6 mr-2 cursor-pointer" onClick={() => setStage("initial")} />
          <h1 className="text-base font-semibold cursor-pointer" onClick={() => setPasswordVerified(false)}>
            PayPay 受け取り
          </h1>
        </div>
        <div className="text-sm underline cursor-pointer" onClick={() => setShowSettings(!showSettings)}>
          設定
        </div>
      </div>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 mx-auto max-w-sm bg-white shadow-lg rounded-b-xl px-6 py-4 z-20"
          >
            <label className="block mb-2 text-sm font-semibold">受け取る金額</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-2 mb-4 border rounded-lg text-right"
            />
            <label className="block mb-2 text-sm font-semibold">送信元</label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <Button
              onClick={() => setShowSettings(false)}
              className="mt-4 w-full bg-[#ff2d55] hover:bg-[#e60039] text-white font-semibold rounded-full py-2"
            >
              決定
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-12 pb-24 relative">
        <AnimatePresence mode="wait">
          {stage === "loading" ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-sm text-center"
            >
              <div className="rounded-2xl bg-white px-6 py-10 shadow-xl">
                <div className="w-12 h-12 border-4 border-[#ff2d55] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <p className="text-[#ff2d55] text-lg font-semibold">受け取り処理中...</p>
              </div>
            </motion.div>
          ) : stage === "initial" ? (
            <motion.div
              key="receive-card"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-sm bg-white text-black rounded-2xl shadow-2xl py-10 px-6"
            >
              <h2 className="text-xl font-bold text-center text-[#ff2d55] mb-4">受け取り内容確認</h2>
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500">送金元: {sender}</p>
                <p className="text-sm text-gray-500">日付: {new Date().toLocaleDateString()}</p>
                <p className="text-5xl font-extrabold text-black mt-4">¥{amount.toLocaleString()}</p>
              </div>
              <Button
                onClick={handleReceive}
                className="w-full bg-[#ff2d55] hover:bg-[#e60039] text-white font-bold text-lg py-3 rounded-full"
              >
                受け取る
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="received"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white text-black rounded-t-3xl shadow-2xl py-10 px-6 z-30"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="bg-[#00c853]/10 rounded-full p-4"
                >
                  <CheckCircle className="w-16 h-16 text-[#00c853] mb-2 animate-bounce" />
                </motion.div>
                <h2 className="text-xl font-bold text-[#00c853] mt-4">受け取り完了</h2>
                <p className="text-4xl font-extrabold mt-2">¥{amount.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-2">PayPay残高にチャージされました</p>
                <p className="text-sm text-gray-400 mt-1">送信元: {sender}</p>
              </div>
              <div className="mt-6">
                <Button
                  className="w-full bg-[#f5f5f5] text-black hover:bg-[#ebebeb] font-medium py-2 rounded-full"
                  onClick={() => setStage("initial")}
                >
                  戻る
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute w-[300px] h-[300px] bg-[#ff2d55] opacity-10 rounded-full blur-3xl top-[30%] left-[20%]"
          animate={{ x: [0, 30, -30, 0], y: [0, 30, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[200px] h-[200px] bg-[#ff2d55] opacity-10 rounded-full blur-2xl bottom-[10%] right-[10%]"
          animate={{ x: [0, -20, 20, 0], y: [0, -20, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
        />
      </div>

      <div className="text-center py-2 text-xs text-gray-400">PayPay株式会社</div>
    </div>
  )
}
