const POSTS = [
  {
    slug: "ce-este-chimia",
    titlu: "Ce este chimia?",
    data: "2026-08-15",
    categorie: "Clasa 7",
    taguri: ["teorie", "materie", "introducere"],
    cover: "assets/images/chimie-intro.jpg", // lasă "" dacă nu ai imagine
    extras: "Chimia este știința care studiază compoziția, structura și transformările substanțelor.",
    avertismente: [],
    continut: `
      <p>Chimia este știința care se ocupă cu studiul <strong>substanțelor</strong>, al <strong>proprietăților</strong> lor și al <strong>transformărilor</strong> pe care le suferă.</p>
      <div class="definitie">
        <strong>📚 Definiție:</strong> Chimia este știința naturii care studiază compoziția, structura, proprietățile și transformările substanțelor, precum și legile care guvernează aceste transformări.
      </div>
      <h2>Ce studiază chimia?</h2>
      <ul>
        <li><strong>Substanțele</strong> – forme de materie cu compoziție constantă (ex: apa, sarea, zahărul).</li>
        <li><strong>Fenomenele chimice</strong> – transformări în urma cărora se formează substanțe noi (ex: arderea lemnului, ruginirea fierului).</li>
        <li><strong>Fenomenele fizice</strong> – transformări în care nu se schimbă compoziția substanței (ex: topirea gheții, fierberea apei).</li>
      </ul>
      <div class="exemplu">
        <strong>📋 Exemplu rezolvat:</strong> Identifică tipul de fenomen: dizolvarea zahărului în apă.<br>
        <strong>Răspuns:</strong> Este un fenomen fizic, deoarece zahărul își păstrează compoziția chimică; poate fi recuperat prin evaporarea apei.
      </div>
      <h2>Ramurile chimiei</h2>
      <p>Chimia are mai multe ramuri: chimie anorganică, chimie organică, chimie fizică, chimie analitică, biochimie etc. La școală, vei începe cu noțiunile de bază din chimia generală.</p>
      <div class="recapitulare">
        <strong>✅ Recapitulare:</strong> Chimia studiază substanțele și transformările lor. Fenomenele chimice produc substanțe noi, pe când cele fizice nu schimbă compoziția.
      </div>
    `
  },
  {
    slug: "semaforul-chimic",
    titlu: "Experiment: Semaforul chimic",
    data: "2026-08-14",
    categorie: "Experimente",
    taguri: ["experiment", "reactii-chimice", "redox"],
    cover: "assets/images/semafor-chimic.jpg",
    extras: "Un experiment spectaculos care arată reacții redox cu schimbări de culoare.",
    avertismente: [
      "Folosește mănuși și ochelari de protecție.",
      "Nu inhala vaporii și lucrează într-un loc ventilat.",
      "Soluțiile pot păta hainele și pielea."
    ],
    continut: `
      <p>Semaforul chimic este un experiment clasic de chimie redox care produce schimbări spectaculoase de culoare: verde → roșu → galben.</p>
      <h2>Materiale necesare</h2>
      <ul>
        <li>Glucoză (sau zahăr)</li>
        <li>Hidroxid de sodiu (NaOH) - soluție diluată</li>
        <li>Indigo carmin (colorant alimentar albastru)</li>
        <li>Apă distilată</li>
        <li>Flacon sau eprubetă cu dop</li>
      </ul>
      <h2>Procedeu</h2>
      <ol>
        <li>Dizolvă 1 g de glucoză în 50 ml apă distilată.</li>
        <li>Adaugă 2-3 picături de soluție de indigo carmin.</li>
        <li>Adaugă cu grijă 2-3 ml soluție de NaOH (atenție, este caustic!).</li>
        <li>Închide flaconul și agită ușor. Soluția devine verde.</li>
        <li>Lasă să stea: culoarea trece în roșu, apoi în galben.</li>
        <li>Agită din nou și culoarea revine la verde.</li>
      </ol>
      <h2>Explicație</h2>
      <p>Indigo carminul este un indicator redox. În mediu alcalin, glucoza reduce colorantul, schimbându-i culoarea. Agitarea dizolvă oxigenul din aer, care oxidează din nou colorantul, inversând culorile.</p>
      <div class="avertisment">
        <strong>🔥 Atenție:</strong> Soluția de NaOH este corozivă. Poartă echipament de protecție și cere supravegherea unui adult sau profesor.
      </div>
      <div class="recapitulare">
        <strong>✅ Recapitulare:</strong> Experimentul demonstrează o reacție redox reversibilă, în care culorile se schimbă în funcție de prezența oxigenului.
      </div>
    `
  },
  {
    slug: "test-autoevaluare-clasa7",
    titlu: "Test de autoevaluare - Clasa 7",
    data: "2026-08-13",
    categorie: "Teste",
    taguri: ["test-autoevaluare", "clasa-7", "recapitulare"],
    cover: "",
    extras: "Verifică-ți cunoștințele despre noțiunile de bază ale chimiei.",
    avertismente: [],
    continut: `
      <h2>Întrebări</h2>
      <ol>
        <li>
          <strong>Ce este chimia?</strong>
          <details>
            <summary>Vezi răspuns</summary>
            <p>Chimia este știința care studiază compoziția, structura, proprietățile și transformările substanțelor.</p>
          </details>
        </li>
        <li>
          <strong>Dă un exemplu de fenomen chimic.</strong>
          <details>
            <summary>Vezi răspuns</summary>
            <p>Arderea lemnului, ruginirea fierului, fermentarea mustului etc.</p>
          </details>
        </li>
        <li>
          <strong>Care este diferența dintre un fenomen fizic și unul chimic?</strong>
          <details>
            <summary>Vezi răspuns</summary>
            <p>Fenomenul fizic nu schimbă compoziția substanței (ex: topirea gheții), iar fenomenul chimic produce substanțe noi (ex: arderea hârtiei).</p>
          </details>
        </li>
      </ol>
      <div class="recapitulare">
        <strong>✅ Recapitulare:</strong> Dacă ai răspuns corect la cel puțin 2 din 3 întrebări, ai înțeles noțiunile de bază!
      </div>
    `
  }
];