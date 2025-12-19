import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      companyName, 
      contactName, 
      email, 
      phone, 
      department, 
      position, 
      employeeCount, 
      budget, 
      timeline, 
      inquiryType, 
      inquiry 
    } = body

    // バリデーション
    if (!companyName || !contactName || !email || !inquiryType || !inquiry) {
      return NextResponse.json(
        { error: "必要な項目が入力されていません" },
        { status: 400 }
      )
    }

    // お問い合わせ種別の表示名を取得
    const inquiryTypeLabels: { [key: string]: string } = {
      "ui-ux-design": "UI/UXデザイン・制作",
      "seo-website": "SEO特化Webサイト制作",
      "landing-page": "高コンバージョンLP制作",
      "responsive-design": "レスポンシブサイト制作",
      "ecommerce": "ECサイト構築",
      "cms-development": "CMS構築・カスタマイズ",
      "web-system": "Webシステム開発",
      "mobile-app": "モバイルアプリ開発",
      "maintenance": "保守・運用サポート",
      "seo-consulting": "SEOコンサルティング",
      "custom-development": "カスタム開発",
      "dx-consulting": "DXコンサルティング",
      "security": "セキュリティ強化",
      "other": "その他のご相談",
    }

    const inquiryTypeLabel = inquiryTypeLabels[inquiryType] || inquiryType

    // 従業員数の表示名
    const employeeCountLabels: { [key: string]: string } = {
      "1-10": "1-10名",
      "11-50": "11-50名",
      "51-100": "51-100名",
      "101-500": "101-500名",
      "501-1000": "501-1000名",
      "1000+": "1000名以上",
    }

    // 予算の表示名
    const budgetLabels: { [key: string]: string } = {
      "under-50": "50万円未満（一式）",
      "50-100": "50-100万円（一式）",
      "100-300": "100-300万円（一式）",
      "monthly-20-50": "月額20-50万円",
      "monthly-50-100": "月額50-100万円",
      "custom": "カスタム見積もり",
      "consultation": "予算相談したい",
    }

    // 希望開始時期の表示名
    const timelineLabels: { [key: string]: string } = {
      "immediate": "すぐに開始したい",
      "1month": "1ヶ月以内",
      "3months": "3ヶ月以内",
      "6months": "6ヶ月以内",
      "1year": "1年以内",
      "undecided": "未定・相談したい",
    }

    // 企業向けお問い合わせ内容をメールで送信
    if (!resend) {
      return NextResponse.json(
        { error: "メール送信機能が設定されていません" },
        { status: 500 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: "企業お問い合わせ <onboarding@resend.dev>",
      to: ["yokaunit.info@gmail.com"], // 企業向けも同じメールアドレスに送信
      subject: `【YokaUnit企業】${inquiryTypeLabel} - ${companyName}様`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 3px solid #3b82f6; padding-bottom: 10px;">
            🏢 YokaUnit 企業向けお問い合わせ
          </h2>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e40af; margin-top: 0;">企業情報</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <p><strong>会社名:</strong> ${companyName}</p>
              <p><strong>従業員数:</strong> ${employeeCount ? employeeCountLabels[employeeCount] || employeeCount : '未選択'}</p>
              <p><strong>担当者名:</strong> ${contactName}</p>
              <p><strong>役職:</strong> ${position || '未入力'}</p>
              <p><strong>部署名:</strong> ${department || '未入力'}</p>
              <p><strong>電話番号:</strong> ${phone || '未入力'}</p>
            </div>
            <p><strong>メールアドレス:</strong> ${email}</p>
          </div>

          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin-top: 0;">プロジェクト詳細</h3>
            <p><strong>お問い合わせ種別:</strong> ${inquiryTypeLabel}</p>
            <p><strong>ご予算:</strong> ${budget ? budgetLabels[budget] || budget : '未選択'}</p>
            <p><strong>希望開始時期:</strong> ${timeline ? timelineLabels[timeline] || timeline : '未選択'}</p>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border: 2px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #1e40af; margin-top: 0;">お問い合わせ詳細</h3>
            <div style="white-space: pre-wrap; line-height: 1.6; background-color: #f9fafb; padding: 15px; border-radius: 6px;">${inquiry}</div>
          </div>

          <div style="margin-top: 20px; padding: 15px; background-color: #fef2f2; border-radius: 8px; border-left: 4px solid #ef4444;">
            <h4 style="color: #dc2626; margin-top: 0;">🚨 重要：企業向け対応</h4>
            <p style="margin: 0; font-size: 14px; color: #7f1d1d;">
              <strong>返信先:</strong> ${email}<br>
              <strong>会社名:</strong> ${companyName}<br>
              <strong>担当者:</strong> ${contactName}様<br>
              <strong>送信日時:</strong> ${new Date().toLocaleString('ja-JP')}<br>
              <strong>優先度:</strong> 企業案件（高優先度）
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

    // 企業向け自動返信メール
    await resend.emails.send({
      from: "YokaUnit 企業サポート <onboarding@resend.dev>",
      to: [email],
      subject: "【YokaUnit】企業向けお問い合わせを承りました",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 3px solid #3b82f6; padding-bottom: 10px;">
            🏢 企業向けお問い合わせありがとうございます
          </h2>
          
          <p>${contactName}様</p>
          <p>この度は、YokaUnitの企業向けサービスにお問い合わせをいただき、誠にありがとうございます。</p>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e40af; margin-top: 0;">お問い合わせ内容確認</h3>
            <p><strong>会社名:</strong> ${companyName}</p>
            <p><strong>担当者名:</strong> ${contactName}様</p>
            <p><strong>お問い合わせ種別:</strong> ${inquiryTypeLabel}</p>
            <p><strong>ご予算:</strong> ${budget ? budgetLabels[budget] || budget : '未選択'}</p>
            <p><strong>希望開始時期:</strong> ${timeline ? timelineLabels[timeline] || timeline : '未選択'}</p>
          </div>

          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3 style="color: #047857; margin-top: 0;">📋 今後の流れ</h3>
            <ol style="margin: 0; color: #065f46;">
              <li>担当者より<strong>1営業日以内</strong>にご連絡いたします</li>
              <li>ヒアリングの実施（オンライン会議 or お電話）</li>
              <li>お見積もり・提案書の作成</li>
              <li>ご提案内容のご説明</li>
            </ol>
          </div>

          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #92400e;">
              <strong>🔒 機密保持について</strong><br>
              企業様とのお取引では、機密保持契約（NDA）の締結も可能です。<br>
              ご希望の場合は、お気軽にお申し付けください。
            </p>
          </div>

          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #374151;">
              <strong>📧 緊急のお問い合わせの場合</strong><br>
              メールアドレス: yokaunit.info@gmail.com<br>
              （お電話でのお問い合わせは現在準備中です）
            </p>
          </div>

          <p>御社のビジネス成長のお手伝いができることを楽しみにしております。</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="font-size: 12px; color: #6b7280;">
            YokaUnit 企業サポート部<br>
            Email: business@yokaunit.com<br>
            https://yokaunit.com/corporate<br>
            このメールは自動送信されています。
          </p>
        </div>
      `,
    })

    return NextResponse.json({ 
      success: true, 
      message: "企業向けお問い合わせを送信しました",
      messageId: data?.id 
    })

  } catch (error) {
    console.error("Corporate form error:", error)
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    )
  }
} 