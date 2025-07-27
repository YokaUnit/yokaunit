import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, inquiryType } = body

    // バリデーション
    if (!name || !email || !subject || !message || !inquiryType) {
      return NextResponse.json(
        { error: "必要な項目が入力されていません" },
        { status: 400 }
      )
    }

    // お問い合わせカテゴリの表示名を取得
    const categoryLabels: { [key: string]: string } = {
      "general": "一般的なお問い合わせ",
      "tool-request": "ツール開発のご要望",
      "bug-report": "エラー・不具合の報告",
      "feature-request": "機能改善のご提案",
      "premium": "有料会員について",
      "corporate": "企業向けサービス",
      "advertisement": "広告掲載のご相談",
      "partnership": "業務提携について",
      "media": "メディア取材について",
      "api": "API連携について",
      "security": "セキュリティについて",
      "other": "その他ご意見・ご要望",
    }

    const categoryLabel = categoryLabels[inquiryType] || inquiryType

    // お問い合わせ内容をメールで送信
    const { data, error } = await resend.emails.send({
      from: "お問い合わせ <onboarding@resend.dev>", // Resendのデフォルトドメイン使用
      to: ["yokaunit.info@gmail.com"], // 受信したいメールアドレス
      subject: `【YokaUnit】${categoryLabel} - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            YokaUnit お問い合わせ
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">基本情報</h3>
            <p><strong>お名前:</strong> ${name}</p>
            <p><strong>メールアドレス:</strong> ${email}</p>
            <p><strong>お問い合わせ種類:</strong> ${categoryLabel}</p>
            <p><strong>件名:</strong> ${subject}</p>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #1e40af; margin-top: 0;">お問い合わせ内容</h3>
            <div style="white-space: pre-wrap; line-height: 1.6;">${message}</div>
          </div>

          <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #92400e;">
              <strong>返信先:</strong> ${email}<br>
              <strong>送信日時:</strong> ${new Date().toLocaleString('ja-JP')}
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: "メールの送信に失敗しました" },
        { status: 500 }
      )
    }

    // 送信者への自動返信メール
    await resend.emails.send({
      from: "YokaUnit <onboarding@resend.dev>",
      to: [email],
      subject: "【YokaUnit】お問い合わせを承りました",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            お問い合わせありがとうございます
          </h2>
          
          <p>この度は、YokaUnitにお問い合わせをいただき、誠にありがとうございます。</p>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">お問い合わせ内容</h3>
            <p><strong>お名前:</strong> ${name}</p>
            <p><strong>お問い合わせ種類:</strong> ${categoryLabel}</p>
            <p><strong>件名:</strong> ${subject}</p>
          </div>

          <p>内容を確認次第、担当者より<strong>2営業日以内</strong>にご連絡いたします。</p>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #92400e;">
              <strong>緊急のお問い合わせの場合</strong><br>
              お電話でもお気軽にお問い合わせください。<br>
              TEL: 03-1234-5678（平日 10:00-18:00）
            </p>
          </div>

          <p>今後ともYokaUnitをよろしくお願いいたします。</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="font-size: 12px; color: #6b7280;">
            YokaUnit運営チーム<br>
            https://yokaunit.com<br>
            このメールは自動送信されています。
          </p>
        </div>
      `,
    })

    return NextResponse.json({ 
      success: true, 
      message: "お問い合わせを送信しました",
      messageId: data?.id 
    })

  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    )
  }
} 