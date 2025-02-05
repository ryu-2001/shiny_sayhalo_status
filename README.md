#  Shiny SayHalo Status Calculator

##  概要
Shiny SayHalo Status Calculatorは、React を用いて作成されたステータス計算アプリです。  
このアプリを使用すると、現在のポイントやステータスの上限を入力し、**最大のステータス値** を計算できます。  
また、**1000・2000 まで上げるために必要なポイント** も表示します。

##  機能
- **所持ポイントの入力**  
  各ステータスの現在のポイントを入力できます。
- **ステータスの入力**  
  現在の各ステータス値と、それに対する割り振り回数を入力します。
- **上限の入力**  
  各ステータスの上限値と、割り振り回数の制限を入力します。
- **計算ボタン**  
  入力値に基づいて、最大のステータスや 1000・2000 までに必要なポイントを計算します。
- **結果の表示**  
  - **最大のステータス値**  
    現在のポイントで到達可能な最大ステータスが表示されます。
  - **1000 まであと**  
    各ステータスが **1000** に達するために必要なポイントが表示されます。
  - **2000 まであと**  
    各ステータスが **2000** に達するために必要なポイントが表示されます。  
    「**不可**」と表示された場合は、**割り振り回数の上限** により 2000 まで上げることができないことを意味します。

##  使用方法
1. アプリを開き、各入力欄に **現在のポイント・ステータス・上限値** を入力します。
2. **「計算」ボタン** を押すと、結果が自動で表示されます。
3. 必要なポイントや最大のステータス値を参考に、ステータスの配分を計画できます。

##  技術スタック
- **フロントエンド:** React
- **スタイル:** CSS-in-JS (inline styles)

##  プロジェクト構成
/shiny_sayhalo_status
│── src/
│   ├── components/
│   ├── App.js
│   ├── index.js
│── public/
│── README.md
│── package.json

## 📦 インストール & 実行方法
1. **リポジトリをクローン**
   ```sh
   git clone https://github.com/your-username/shiny_sayhalo_status.git
   cd shiny_sayhalo_status
1. **依存関係をインストール**
   ```sh
   npm install
1. **アプリを起動**
   ```sh
   npm start
