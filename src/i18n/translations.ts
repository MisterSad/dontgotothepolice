export type Lang = "fr" | "en" | "de";

const translations = {
  fr: {
    // ──────────── Layout / Global ────────────
    switchLang: "EN",
    switchLangLabel: "Switch to English",

    // ──────────── Page – BOOT ────────────
    boot: {
      line1: "Initialisation de la séquence de démarrage...",
      line2: "Chargement des modules noyau (143 modules)... terminé.",
      line3: "Montage du système de fichiers racine (lecture seule)... terminé.",
      line4: "Démarrage de l'interface Security Operations Center...",
    },

    // ──────────── Page – INTRO ────────────
    intro: {
      line1: "> ALERTE CRITIQUE - 08/12/2023 - 04:50 CET",
      line2: "> Infrastructure client COAXIS - Fauguerolles, France",
      line3: "> Anomalie détectée sur 24% des serveurs",
      line4: "> Statut : INCONNU",
      line5: "> ...",
      body1: "Vous êtes l'analyste de garde cette nuit.",
      body2: "Vous avez 5 minutes avant que tout bascule.",
      cta: "[ ACCEPTER LA MISSION ]",
    },

    // ──────────── Page – BRIEFING ────────────
    briefing: {
      title: "📁 DOSSIER INCIDENT #4902",
      client: "Client :",
      clientValue: "Coaxis (Hébergeur Cloud)",
      context: "Contexte :",
      contextValue:
        "Ils hébergent les données de milliers de cabinets comptables et entreprises de santé.",
      situation: "Situation :",
      situationValue:
        "Joseph Veigas (CEO) vient d'appeler notre SOC. Une grande partie de son infrastructure interne ne répond plus depuis quelques heures. Les serveurs de sauvegarde semblent également instables.",
      mission:
        "Votre mission : Remonter la piste, identifier l'intrus, contenir l'attaque et assainir le SI. Le temps joue contre nous.",
      cta: "[ ENTRER DANS LE SOC ]",
    },

    // ──────────── Page – HEADER ────────────
    header: {
      titleFull: "// ORANGE CYBERDEFENSE : SOC_TERMINAL",
      titleShort: "// SOC_TERMINAL",
      countdown: "Compte à rebours :",
    },

    // ──────────── Level 1 ────────────
    level1: {
      title: "Niveau 1 : Le Maillon Faible",
      description:
        "[ 07/12/2023 - 22:43 CET ]\nUn employé du client a cliqué sur un e-mail douteux, ce qui a permis l'intrusion initiale. Identifiez l'e-mail de phishing parmi ces 4 messages reçus ce soir-là.",
      labelFrom: "De :",
      labelSubject: "Objet :",
      realLink: "Lien réel :",
      errorMsg:
        "❌ Ce n'est pas celui-là. Regardez de plus près les adresses et les URLs...",
      emails: [
        {
          sender: "IT Support <support@coaxis.fr>",
          subject: "Mise à jour requise : Serveur VPN",
          body: "Bonjour, \n\nUne nouvelle mise à jour de sécurité est requise pour le serveur VPN. \n\nVeuillez télécharger le patch ici : https://vpn.coaxis.fr/patch",
          isPhishing: false,
        },
        {
          sender: "Ressources Humaines <rh@coaxis.fr>",
          subject: "Nouveau règlement intérieur 2024",
          body: "Bonjour,\n\nVous trouverez ci-joint le nouveau règlement intérieur applicable au 1er janvier 2024.\n\nCordialement,\nService RH",
          isPhishing: false,
        },
        {
          sender: "Service Microsoft <alerte@mlcrosoft-security.com>",
          subject: "Alerte de sécurité : Connexion inhabituelle",
          body: "Votre compte Microsoft Office 365 a été bloqué suite à une activité suspecte.\n\nPour réactiver votre accès, veuillez vérifier votre identité dans les 24h :\n\nLien : https://login.mlcrosoft.com/verify",
          isPhishing: true,
          hoverLink: "http://185.25.x.x/payload.exe",
        },
        {
          sender: "Joseph Veigas <j.veigas@coaxis.fr>",
          subject: "Réunion CODIR de demain",
          body: "Bonjour à tous,\n\nPouvez-vous me préparer les chiffres Q4 pour la réunion de demain ?\n\nMerci,\nJoseph",
          isPhishing: false,
        },
      ],
    },

    // ──────────── Level 2 ────────────
    level2: {
      title: "Niveau 2 : Sous les Radars",
      description:
        "[ 08/12/2023 - 02:00 CET ]\nL'attaquant fouille le réseau. Identifiez les 5 lignes de logs système suspectes avant que le temps ne s'écoule.",
      counter: "Lignes suspectes trouvées :",
    },

    // ──────────── Level 3 ────────────
    level3: {
      title: "Niveau 3 : Le Compte à Rebours",
      description:
        "[ 08/12/2023 - 04:32 CET ]\nLa crise est là. Prenez les bonnes décisions dans l'urgence.",
      ransomButton: "[ LANCER LA RÉPONSE À INCIDENT ]",
      questions: [
        {
          question: "1. Que faire en premier suite au chiffrement des fichiers ?",
          options: [
            {
              text: "Payer immédiatement pour récupérer les données vite.",
              isCorrect: false,
              feedback:
                "Jamais ! Payer finance le crime et n'offre aucune garantie de récupération.",
            },
            {
              text: "Isoler les systèmes compromis du réseau.",
              isCorrect: true,
              feedback:
                "Exact. Il faut débrancher les câbles réseau/couper le Wi-Fi pour stopper la propagation, mais NE PAS éteindre.",
            },
            {
              text: "Éteindre électriquement tous les serveurs d'un coup.",
              isCorrect: false,
              feedback:
                "Non ! Cela détruit la mémoire vive (RAM) qui contient de précieuses preuves pour l'enquête.",
            },
          ],
        },
        {
          question: "2. Qui devez-vous alerter en priorité ?",
          options: [
            {
              text: "La presse pour médiatiser l'affaire et prévenir tout le monde.",
              isCorrect: false,
              feedback:
                "La communication grand public vient plus tard, après avoir sécurisé l'entreprise.",
            },
            {
              text: "La cellule de crise, votre prestataire cyber, et les autorités (ANSSI/CNIL).",
              isCorrect: true,
              feedback:
                "Oui. Il faut mobiliser les experts (ex: Orange Cyberdefense) et prévenir les autorités légales.",
            },
            {
              text: "Uniquement la direction générale et personne d'autre.",
              isCorrect: false,
              feedback:
                "C'est insuffisant. Vous avez des obligations légales (CNIL) en cas de fuite de données personnelles.",
            },
          ],
        },
        {
          question:
            "3. La direction vous demande de restaurer les sauvegardes. Que faire ?",
          options: [
            {
              text: "On les reconnecte immédiatement au réseau pour gagner du temps.",
              isCorrect: false,
              feedback:
                "Danger ! L'attaquant est peut-être encore sur le réseau et chiffrera vos sauvegardes instantanément.",
            },
            {
              text: "On les vérifie dans une 'zone propre' isolée avant de les utiliser.",
              isCorrect: true,
              feedback:
                "Parfait. Il faut s'assurer qu'elles ne sont pas compromises ou vérolées avant toute restauration.",
            },
            {
              text: "On n'a pas besoin des sauvegardes, un déchiffreur sera vite trouvé.",
              isCorrect: false,
              feedback:
                "Totalement illusoire face à des souches modernes comme LockBit 3.0.",
            },
          ],
        },
        {
          question:
            "4. Un client exige des réponses immédiates car ses services sont coupés.",
          options: [
            {
              text: "Mentir et dire qu'il s'agit d'une simple panne électrique temporaire.",
              isCorrect: false,
              feedback:
                "Le mensonge détruit la confiance à long terme. La vérité finit toujours par se savoir.",
            },
            {
              text: "Communiquer de façon transparente, factuelle et progressive.",
              isCorrect: true,
              feedback:
                "C'est la clé : Assumer la crise, expliquer ce qui est fait sans s'avancer sur des délais impossibles.",
            },
            {
              text: "Faire la sourde oreille et ne pas répondre tant que le problème n'est pas réglé.",
              isCorrect: false,
              feedback: "Le silence crée la panique et les rumeurs.",
            },
          ],
        },
      ],
    },

    // ──────────── Level 4 ────────────
    level4: {
      title: "Niveau 4 : La Reconstruction",
      description:
        "[ 14/12/2023 - 09:00 CET ]\nAvant de redémarrer les services clients, vous devez assainir le SI. Classez chaque pratique observée comme \"SÉCURISÉE\" ou \"DANGEREUSE\".\n(Max 2 erreurs tolérées).",
      btnDangerous: "DANGEREUX",
      btnSecure: "SÉCURISÉ",
      validate: "[ VALIDER LA SÉCURITÉ ]",
      errorMsg: (n: number) => `❌ ${n} erreurs détectées. Corrigez-les.`,
      pendingMsg: "Assainissement requis avant redémarrage.",
      practices: [
        {
          text: "Mot de passe 'Coaxis2023!' utilisé par 3 employés",
          isSecure: false,
        },
        {
          text: "Authentification multi-facteurs (MFA) activée sur le VPN",
          isSecure: true,
        },
        {
          text: "Mises à jour désactivées 'pour ne pas perturber la prod'",
          isSecure: false,
        },
        {
          text: "Sauvegardes stockées sur un serveur isolé (air-gapped)",
          isSecure: true,
        },
        {
          text: "Post-it avec le mot de passe admin collé sur un écran",
          isSecure: false,
        },
        {
          text: "Politique de mots de passe complexes (12+ caractères)",
          isSecure: true,
        },
        {
          text: "Un seul compte administrateur partagé entre 5 techniciens",
          isSecure: false,
        },
        {
          text: "Formation anti-phishing trimestrielle pour tous",
          isSecure: true,
        },
      ],
    },

    // ──────────── Level 5 ────────────
    level5: {
      title: "Niveau 5 : Le Décryptage Final",
      description:
        "[ 15/12/2023 - 14:00 CET ]\nLes sauvegardes sont saines. Il ne reste qu'un dernier message laissé par le groupe LockBit 3.0. Utilisez l'outil de force brute pour trouver le décalage et déchiffrer le message.",
      labelEncrypted: "MESSAGE CHIFFRÉ :",
      labelDecrypting: "TENTATIVE DE DÉCHIFFREMENT :",
      labelShift: "DÉCALAGE :",
      btnTest: "[ TESTER LA CLÉ ]",
      hint: "Indice: La lettre 'L' chiffrée donne 'S'...",
      targetPhrase: "LA MEILLEURE DEFENSE C'EST VOUS",
    },

    // ──────────── PedagogicalBox ────────────
    pedagogical: {
      continue: "[CONTINUER L'INVESTIGATION]",
      reflexes: {
        1: {
          title: "RÉFLEXE CYBER #1",
          content: `Toujours vérifier l'URL exacte avant de cliquer. Un seul caractère modifié peut mener vers un site pirate. "mlcrosoft" n'est pas "microsoft". Survolez les liens, vérifiez les domaines. L'attaquant est entré dans le réseau.`,
        },
        2: {
          titleOk: "RÉFLEXE CYBER #2",
          titleFail: "TEMPS ÉCOULÉ - L'ATTAQUANT AVANCE",
          content:
            "La surveillance continue (monitoring) des logs est essentielle. Les signaux faibles - connexions inhabituelles, élévation de privilèges, trafic sortant anormal - sont souvent les premiers indices d'une intrusion.",
        },
        3: {
          title: "RÉFLEXE CYBER #3",
          content:
            "En cas de cyberattaque - NE JAMAIS payer la rançon. Isoler, alerter (ANSSI, forces de l'ordre, prestataire cyber), vérifier les sauvegardes en zone propre, et communiquer avec transparence.",
        },
        4: {
          title: "RÉFLEXE CYBER #4",
          content:
            "80% des cyberattaques exploitent des failles humaines. MFA, mots de passe uniques, mises à jour, formation anti-phishing : ces gestes simples sont votre première ligne de défense.",
        },
        5: {
          title: "RÉFLEXE CYBER #5",
          content:
            "Le chiffrement protège vos données. Mais quand il est retourné contre vous par un ransomware, seules des sauvegardes saines et une préparation en amont permettent de s'en sortir. La meilleure défense, c'est bien vous.",
        },
      },
    },

    // ──────────── ScoreScreen ────────────
    scoreScreen: {
      title: "INTRUSION CONTENUE",
      grades: {
        legend: "LÉGENDE DU SOC",
        expert: "EXPERT CYBER",
        confirmed: "ANALYSTE CONFIRMÉ",
        junior: "ANALYSTE JUNIOR",
      },
      labelGrade: "GRADE ACQUIS",
      labelTime: "TEMPS DE RÉPONSE",
      reflexesTitle: "Vos 5 réflexes de survie :",
      reflexes: [
        "URL : Vérifiez chaque caractère.",
        "Surveillance : Détectez les signaux faibles dans les logs.",
        "Gestion de crise : Ne payez pas, isolez, alertez.",
        "Hygiène : MFA et mises à jour sont non-négociables.",
        "Sauvegardes : Votre seul salut face au ransomware.",
      ],
      story1:
        "Dans la nuit du 7 au 8 décembre 2023, cette histoire s'est réellement produite. Coaxis, une PME du Lot-et-Garonne, a été frappée par LockBit.",
      story2:
        "350 000 entreprises paralysées. 5 millions de dollars de rançon exigés.\nIls n'ont pas payé. Ils ont tout reconstruit en un mois.",
      story3: "La meilleure défense, c'est vous.",
      docLink: "🎬 Découvrez le documentaire complet",
    },

    // ──────────── ShareButton ────────────
    shareButton: {
      label: "PARTAGER MON SCORE SUR LINKEDIN",
      message: (score: string, time: string) =>
        `🔐 Je viens de terminer l'escape game "Don't Go to the Police" - et j'ai obtenu le grade ${score} en ${time} !

5 niveaux pour vivre une cyberattaque de l'intérieur et comprendre pourquoi la cybersécurité nous concerne TOUS.

Inspiré de l'attaque réelle de LockBit contre Coaxis en décembre 2023, racontée dans le documentaire de @Orange Cyberdefense.

🎬 Regardez le documentaire : https://dontgotothepolice.orangecyberdefense.com
🎮 Faites l'escape game à votre tour : https://dontgotothepolice.vercel.app/

#DontGoToThePolice #OrangeCyberdefense #Orange`,
    },
  },

  // ════════════════════════════════════════════════════
  //  ENGLISH
  // ════════════════════════════════════════════════════
  en: {
    switchLang: "DE",
    switchLangLabel: "Auf Deutsch wechseln",

    boot: {
      line1: "Initializing boot sequence...",
      line2: "Loading kernel modules (143 modules)... done.",
      line3: "Mounting root filesystem (read-only)... done.",
      line4: "Starting Security Operations Center interface...",
    },

    intro: {
      line1: "> CRITICAL ALERT - 08/12/2023 - 04:50 CET",
      line2: "> Client infrastructure COAXIS - Fauguerolles, France",
      line3: "> Anomaly detected on 24% of servers",
      line4: "> Status: UNKNOWN",
      line5: "> ...",
      body1: "You are the on-call analyst tonight.",
      body2: "You have 5 minutes before everything collapses.",
      cta: "[ ACCEPT THE MISSION ]",
    },

    briefing: {
      title: "📁 INCIDENT FILE #4902",
      client: "Client:",
      clientValue: "Coaxis (Cloud Hosting Provider)",
      context: "Context:",
      contextValue:
        "They host data for thousands of accounting firms and healthcare companies.",
      situation: "Situation:",
      situationValue:
        "Joseph Veigas (CEO) just called our SOC. A large part of their internal infrastructure has been unresponsive for several hours. Backup servers also appear unstable.",
      mission:
        "Your mission: Trace the attack, identify the intruder, contain the breach, and sanitize the IS. Time is running out.",
      cta: "[ ENTER THE SOC ]",
    },

    header: {
      titleFull: "// ORANGE CYBERDEFENSE : SOC_TERMINAL",
      titleShort: "// SOC_TERMINAL",
      countdown: "Countdown:",
    },

    level1: {
      title: "Level 1: The Weak Link",
      description:
        "[ 07/12/2023 - 22:43 CET ]\nA client employee clicked on a suspicious email, allowing the initial intrusion. Identify the phishing email among these 4 messages received that evening.",
      labelFrom: "From:",
      labelSubject: "Subject:",
      realLink: "Real link:",
      errorMsg:
        "❌ That's not it. Take a closer look at the addresses and URLs...",
      emails: [
        {
          sender: "IT Support <support@coaxis.fr>",
          subject: "Required update: VPN Server",
          body: "Hello,\n\nA new security update is required for the VPN server.\n\nPlease download the patch here: https://vpn.coaxis.fr/patch",
          isPhishing: false,
        },
        {
          sender: "Human Resources <hr@coaxis.fr>",
          subject: "New internal regulations 2024",
          body: "Hello,\n\nPlease find attached the new internal regulations effective January 1st, 2024.\n\nBest regards,\nHR Department",
          isPhishing: false,
        },
        {
          sender: "Microsoft Service <alert@mlcrosoft-security.com>",
          subject: "Security alert: Unusual sign-in",
          body: "Your Microsoft Office 365 account has been blocked due to suspicious activity.\n\nTo reactivate your access, please verify your identity within 24h:\n\nLink: https://login.mlcrosoft.com/verify",
          isPhishing: true,
          hoverLink: "http://185.25.x.x/payload.exe",
        },
        {
          sender: "Joseph Veigas <j.veigas@coaxis.fr>",
          subject: "Tomorrow's Executive Committee",
          body: "Hi everyone,\n\nCould you prepare the Q4 figures for tomorrow's meeting?\n\nThanks,\nJoseph",
          isPhishing: false,
        },
      ],
    },

    level2: {
      title: "Level 2: Under the Radar",
      description:
        "[ 08/12/2023 - 02:00 CET ]\nThe attacker is scanning the network. Identify the 5 suspicious system log lines before time runs out.",
      counter: "Suspicious lines found:",
    },

    level3: {
      title: "Level 3: The Countdown",
      description:
        "[ 08/12/2023 - 04:32 CET ]\nThe crisis is here. Make the right decisions under pressure.",
      ransomButton: "[ LAUNCH INCIDENT RESPONSE ]",
      questions: [
        {
          question: "1. What should you do first after the files are encrypted?",
          options: [
            {
              text: "Pay immediately to get the data back fast.",
              isCorrect: false,
              feedback:
                "Never! Paying funds crime and offers no guarantee of recovery.",
            },
            {
              text: "Isolate compromised systems from the network.",
              isCorrect: true,
              feedback:
                "Correct. Unplug network cables / cut Wi-Fi to stop propagation — but do NOT power off.",
            },
            {
              text: "Hard-power-off all servers at once.",
              isCorrect: false,
              feedback:
                "No! That destroys RAM which contains valuable forensic evidence.",
            },
          ],
        },
        {
          question: "2. Who should you alert first?",
          options: [
            {
              text: "The press to publicize the incident and warn everyone.",
              isCorrect: false,
              feedback:
                "Public communication comes later, after the company is secured.",
            },
            {
              text: "The crisis team, your cyber provider, and authorities (ANSSI / data protection).",
              isCorrect: true,
              feedback:
                "Yes. Engage experts (e.g. Orange Cyberdefense) and notify legal authorities.",
            },
            {
              text: "Only senior management and no one else.",
              isCorrect: false,
              feedback:
                "Insufficient. You have legal obligations (data protection) in case of a data breach.",
            },
          ],
        },
        {
          question:
            "3. Management asks you to restore from backups. What do you do?",
          options: [
            {
              text: "Reconnect them to the network immediately to save time.",
              isCorrect: false,
              feedback:
                "Danger! The attacker may still be on the network and will encrypt your backups instantly.",
            },
            {
              text: "Verify them in an isolated 'clean zone' before use.",
              isCorrect: true,
              feedback:
                "Perfect. Make sure they are not compromised or infected before any restoration.",
            },
            {
              text: "We don't need backups, a decryptor will be found quickly.",
              isCorrect: false,
              feedback:
                "Completely unrealistic against modern strains like LockBit 3.0.",
            },
          ],
        },
        {
          question:
            "4. A client demands immediate answers because their services are down.",
          options: [
            {
              text: "Lie and say it's just a temporary power outage.",
              isCorrect: false,
              feedback:
                "Lying destroys long-term trust. The truth always comes out.",
            },
            {
              text: "Communicate transparently, factually, and progressively.",
              isCorrect: true,
              feedback:
                "That's the key: own the crisis, explain what's being done without promising impossible timelines.",
            },
            {
              text: "Ignore them and don't respond until the problem is fixed.",
              isCorrect: false,
              feedback: "Silence generates panic and rumours.",
            },
          ],
        },
      ],
    },

    level4: {
      title: "Level 4: The Reconstruction",
      description:
        "[ 14/12/2023 - 09:00 CET ]\nBefore restarting client services, you must sanitize the IS. Classify each observed practice as \"SECURE\" or \"DANGEROUS\".\n(Max 2 errors tolerated).",
      btnDangerous: "DANGEROUS",
      btnSecure: "SECURE",
      validate: "[ VALIDATE SECURITY ]",
      errorMsg: (n: number) => `❌ ${n} error(s) detected. Fix them.`,
      pendingMsg: "Sanitization required before restart.",
      practices: [
        {
          text: "Password 'Coaxis2023!' shared by 3 employees",
          isSecure: false,
        },
        {
          text: "Multi-factor authentication (MFA) enabled on the VPN",
          isSecure: true,
        },
        {
          text: "Updates disabled 'to not disrupt production'",
          isSecure: false,
        },
        {
          text: "Backups stored on an isolated server (air-gapped)",
          isSecure: true,
        },
        {
          text: "Post-it with admin password stuck to a screen",
          isSecure: false,
        },
        {
          text: "Complex password policy enforced (12+ characters)",
          isSecure: true,
        },
        {
          text: "One shared admin account between 5 technicians",
          isSecure: false,
        },
        {
          text: "Quarterly anti-phishing training for all staff",
          isSecure: true,
        },
      ],
    },

    level5: {
      title: "Level 5: The Final Decryption",
      description:
        "[ 15/12/2023 - 14:00 CET ]\nThe backups are clean. Only one last message left by the LockBit 3.0 group remains. Use the brute-force tool to find the shift and decrypt the message.",
      labelEncrypted: "ENCRYPTED MESSAGE:",
      labelDecrypting: "DECRYPTION ATTEMPT:",
      labelShift: "SHIFT:",
      btnTest: "[ TEST THE KEY ]",
      hint: "Hint: The letter 'T' encrypted gives 'A'...",
      targetPhrase: "THE BEST DEFENSE IS YOU",
    },

    pedagogical: {
      continue: "[CONTINUE THE INVESTIGATION]",
      reflexes: {
        1: {
          title: "CYBER REFLEX #1",
          content: `Always check the exact URL before clicking. A single changed character can lead to a pirate site. "mlcrosoft" is not "microsoft". Hover over links, check domains. The attacker got into the network.`,
        },
        2: {
          titleOk: "CYBER REFLEX #2",
          titleFail: "TIME'S UP — THE ATTACKER ADVANCES",
          content:
            "Continuous log monitoring is essential. Weak signals — unusual connections, privilege escalation, abnormal outbound traffic — are often the first signs of an intrusion.",
        },
        3: {
          title: "CYBER REFLEX #3",
          content:
            "In a cyberattack — NEVER pay the ransom. Isolate, alert (authorities, cyber provider), verify backups in a clean zone, and communicate transparently.",
        },
        4: {
          title: "CYBER REFLEX #4",
          content:
            "80% of cyberattacks exploit human weaknesses. MFA, unique passwords, updates, anti-phishing training: these simple habits are your first line of defense.",
        },
        5: {
          title: "CYBER REFLEX #5",
          content:
            "Encryption protects your data. But when ransomware turns it against you, only clean backups and prior preparation can save you. The best defense is indeed you.",
        },
      },
    },

    scoreScreen: {
      title: "INTRUSION CONTAINED",
      grades: {
        legend: "SOC LEGEND",
        expert: "CYBER EXPERT",
        confirmed: "SENIOR ANALYST",
        junior: "JUNIOR ANALYST",
      },
      labelGrade: "GRADE EARNED",
      labelTime: "RESPONSE TIME",
      reflexesTitle: "Your 5 survival reflexes:",
      reflexes: [
        "URL: Check every character.",
        "Monitoring: Detect weak signals in logs.",
        "Crisis management: Don't pay, isolate, alert.",
        "Hygiene: MFA and updates are non-negotiable.",
        "Backups: Your only salvation against ransomware.",
      ],
      story1:
        "On the night of December 7–8, 2023, this story really happened. Coaxis, an SME in Lot-et-Garonne, was hit by LockBit.",
      story2:
        "350,000 companies paralyzed. $5 million ransom demanded.\nThey didn't pay. They rebuilt everything in one month.",
      story3: "The best defense is you.",
      docLink: "🎬 Watch the full documentary",
    },

    shareButton: {
      label: "SHARE MY SCORE ON LINKEDIN",
      message: (score: string, time: string) =>
        `🔐 I just completed the escape game "Don't Go to the Police" — and I earned the rank ${score} in ${time}!

5 levels to experience a cyberattack from the inside and understand why cybersecurity concerns us ALL.

Inspired by the real LockBit attack on Coaxis in December 2023, told in the documentary by @Orange Cyberdefense.

🎬 Watch the documentary: https://dontgotothepolice.orangecyberdefense.com
🎮 Play the escape game: https://dontgotothepolice.vercel.app/

#DontGoToThePolice #OrangeCyberdefense #Orange`,
    },
  },

  // ════════════════════════════════════════════════════
  //  GERMAN
  // ════════════════════════════════════════════════════
  de: {
    switchLang: "FR",
    switchLangLabel: "Auf Französisch wechseln",

    // ──────────── Page – BOOT ────────────
    boot: {
      line1: "Boot-Sequenz wird initialisiert...",
      line2: "Kernel-Module werden geladen (143 Module)... abgeschlossen.",
      line3: "Root-Dateisystem wird eingehängt (schreibgeschützt)... abgeschlossen.",
      line4: "Security Operations Center-Schnittstelle wird gestartet...",
    },

    // ──────────── Page – INTRO ────────────
    intro: {
      line1: "> KRITISCHE WARNUNG - 08.12.2023 - 04:50 Uhr MEZ",
      line2: "> Client-Infrastruktur COAXIS - Fauguerolles, Frankreich",
      line3: "> Anomalie auf 24 % der Server entdeckt",
      line4: "> Status: UNBEKANNT",
      line5: "> ...",
      body1: "Sie sind der diensthabende Analyst in dieser Nacht.",
      body2: "Sie haben 5 Minuten, bevor alles zusammenbricht.",
      cta: "[ MISSION ANNEHMEN ]",
    },

    // ──────────── Page – BRIEFING ────────────
    briefing: {
      title: "📁 STÖRUNGSAKTE #4902",
      client: "Kunde:",
      clientValue: "Coaxis (Cloud-Hosting-Anbieter)",
      context: "Kontext:",
      contextValue:
        "Sie hosten Daten für Tausende von Buchhaltungsbüros und Gesundheitsunternehmen.",
      situation: "Lage:",
      situationValue:
        "Joseph Veigas (CEO) hat gerade unser SOC angerufen. Ein Großteil der internen Infrastruktur reagiert seit Stunden nicht mehr. Backup-Server scheinen ebenfalls instabil.",
      mission:
        "Ihre Mission: Den Angriff zurückverfolgen, den Eindringling identifizieren, den Einbruch eindämmen und das IS bereinigen. Die Zeit läuft ab.",
      cta: "[ SOC BETRETEN ]",
    },

    // ──────────── Page – HEADER ────────────
    header: {
      titleFull: "// ORANGE CYBERDEFENSE : SOC_TERMINAL",
      titleShort: "// SOC_TERMINAL",
      countdown: "Countdown:",
    },

    // ──────────── Level 1 ────────────
    level1: {
      title: "Stufe 1: Das schwache Glied",
      description:
        "[ 07.12.2023 - 22:43 Uhr MEZ ]\nEin Mitarbeiter des Kunden klickte auf eine verdächtige E-Mail und ermöglichte so den ersten Einbruch. Identifizieren Sie die Phishing-E-Mail unter diesen 4 Nachrichten.",
      labelFrom: "Von:",
      labelSubject: "Betreff:",
      realLink: "Echter Link:",
      errorMsg:
        "❌ Das ist es nicht. Schauen Sie sich die Adressen und URLs genauer an...",
      emails: [
        {
          sender: "IT-Support <support@coaxis.fr>",
          subject: "Erforderliches Update: VPN-Server",
          body: "Hallo,\n\nEin neues Sicherheitsupdate ist für den VPN-Server erforderlich.\n\nBitte laden Sie den Patch hier herunter: https://vpn.coaxis.fr/patch",
          isPhishing: false,
        },
        {
          sender: "Personalwesen <hr@coaxis.fr>",
          subject: "Neue interne Vorschriften 2024",
          body: "Hallo,\n\nIm Anhang finden Sie die neuen internen Vorschriften, gültig ab dem 1. Januar 2024.\n\nMit freundlichen Grüßen,\nPersonalabteilung",
          isPhishing: false,
        },
        {
          sender: "Microsoft-Dienst <warnung@mlcrosoft-security.com>",
          subject: "Sicherheitswarnung: Ungewöhnliche Anmeldung",
          body: "Ihr Microsoft Office 365-Konto wurde aufgrund verdächtiger Aktivitäten gesperrt.\n\nUm Ihren Zugang wiederherzustellen, bestätigen Sie bitte Ihre Identität innerhalb von 24 Stunden:\n\nLink: https://login.mlcrosoft.com/verify",
          isPhishing: true,
          hoverLink: "http://185.25.x.x/payload.exe",
        },
        {
          sender: "Joseph Veigas <j.veigas@coaxis.fr>",
          subject: "Vorstandssitzung morgen",
          body: "Hallo zusammen,\n\nKönnten Sie mir bitte die Q4-Zahlen für die morgige Sitzung vorbereiten?\n\nDanke,\nJoseph",
          isPhishing: false,
        },
      ],
    },

    // ──────────── Level 2 ────────────
    level2: {
      title: "Stufe 2: Unter dem Radar",
      description:
        "[ 08.12.2023 - 02:00 Uhr MEZ ]\nDer Angreifer durchsucht das Netzwerk. Identifizieren Sie die 5 verdächtigen Systemprotokollzeilen, bevor die Zeit abläuft.",
      counter: "Gefundene verdächtige Zeilen:",
    },

    // ──────────── Level 3 ────────────
    level3: {
      title: "Stufe 3: Der Countdown",
      description:
        "[ 08.12.2023 - 04:32 Uhr MEZ ]\nDie Krise ist da. Treffen Sie unter Druck die richtigen Entscheidungen.",
      ransomButton: "[ INCIDENT RESPONSE STARTEN ]",
      questions: [
        {
          question: "1. Was sollten Sie zuerst tun, nachdem die Dateien verschlüsselt wurden?",
          options: [
            {
              text: "Sofort zahlen, um die Daten schnell zurückzubekommen.",
              isCorrect: false,
              feedback:
                "Niemals! Zahlen finanziert Kriminalität und bietet keine Garantie für eine Wiederherstellung.",
            },
            {
              text: "Kompromittierte Systeme vom Netzwerk isolieren.",
              isCorrect: true,
              feedback:
                "Richtig. Netzwerkkabel trennen / WLAN abschalten, um die Verbreitung zu stoppen – aber NICHT ausschalten.",
            },
            {
              text: "Alle Server auf einmal hart abschalten.",
              isCorrect: false,
              feedback:
                "Nein! Das vernichtet den RAM, der wertvolle forensische Beweise enthält.",
            },
          ],
        },
        {
          question: "2. Wen sollten Sie zuerst alarmieren?",
          options: [
            {
              text: "Die Presse, um den Vorfall publik zu machen und alle zu warnen.",
              isCorrect: false,
              feedback:
                "Die öffentliche Kommunikation kommt später, nachdem das Unternehmen gesichert ist.",
            },
            {
              text: "Das Krisenteam, Ihren Cyber-Dienstleister und die Behörden (BSI / Datenschutzbehörde).",
              isCorrect: true,
              feedback:
                "Ja. Experten einbinden (z.B. Orange Cyberdefense) und Behörden benachrichtigen.",
            },
            {
              text: "Nur die Geschäftsführung und sonst niemanden.",
              isCorrect: false,
              feedback:
                "Unzureichend. Sie haben gesetzliche Meldepflichten (Datenschutz) bei Datenpannen.",
            },
          ],
        },
        {
          question:
            "3. Das Management bittet Sie, Backups wiederherzustellen. Was tun Sie?",
          options: [
            {
              text: "Sie sofort wieder mit dem Netzwerk verbinden, um Zeit zu sparen.",
              isCorrect: false,
              feedback:
                "Gefahr! Der Angreifer ist möglicherweise noch im Netzwerk und verschlüsselt Ihre Backups sofort.",
            },
            {
              text: "Sie in einer isolierten 'sauberen Zone' prüfen, bevor sie verwendet werden.",
              isCorrect: true,
              feedback:
                "Perfekt. Stellen Sie sicher, dass sie nicht kompromittiert oder infiziert sind, bevor Sie sie wiederherstellen.",
            },
            {
              text: "Wir brauchen keine Backups, ein Entschlüsselungstool wird schnell gefunden.",
              isCorrect: false,
              feedback:
                "Völlig unrealistisch gegenüber modernen Varianten wie LockBit 3.0.",
            },
          ],
        },
        {
          question:
            "4. Ein Kunde fordert sofortige Antworten, weil seine Dienste ausgefallen sind.",
          options: [
            {
              text: "Lügen und sagen, es handele sich um einen vorübergehenden Stromausfall.",
              isCorrect: false,
              feedback:
                "Lügen zerstört langfristig das Vertrauen. Die Wahrheit kommt immer ans Licht.",
            },
            {
              text: "Transparent, sachlich und fortlaufend kommunizieren.",
              isCorrect: true,
              feedback:
                "Das ist der Schlüssel: Die Krise eingestehen, erklären was getan wird, ohne unmögliche Fristen zu versprechen.",
            },
            {
              text: "Sie ignorieren und nicht antworten, bis das Problem behoben ist.",
              isCorrect: false,
              feedback: "Stille erzeugt Panik und Gerüchte.",
            },
          ],
        },
      ],
    },

    // ──────────── Level 4 ────────────
    level4: {
      title: "Stufe 4: Der Wiederaufbau",
      description:
        "[ 14.12.2023 - 09:00 Uhr MEZ ]\nBevor Sie die Client-Dienste neu starten, müssen Sie das IS bereinigen. Stufen Sie jede Praxis als \"SICHER\" oder \"GEFÄHRLICH\" ein.\n(Max. 2 Fehler erlaubt).",
      btnDangerous: "GEFÄHRLICH",
      btnSecure: "SICHER",
      validate: "[ SICHERHEIT VALIDIEREN ]",
      errorMsg: (n: number) => `❌ ${n} Fehler gefunden. Bitte korrigieren.`,
      pendingMsg: "Bereinigung vor Neustart erforderlich.",
      practices: [
        {
          text: "Passwort 'Coaxis2023!' von 3 Mitarbeitern gemeinsam genutzt",
          isSecure: false,
        },
        {
          text: "Multi-Faktor-Authentifizierung (MFA) im VPN aktiviert",
          isSecure: true,
        },
        {
          text: "Updates deaktiviert, 'um den Betrieb nicht zu stören'",
          isSecure: false,
        },
        {
          text: "Backups auf einem isolierten Server (Air-Gapped) gespeichert",
          isSecure: true,
        },
        {
          text: "Post-it mit Admin-Passwort an einem Bildschirm befestigt",
          isSecure: false,
        },
        {
          text: "Richtlinie für komplexe Passwörter (12+ Zeichen) durchgesetzt",
          isSecure: true,
        },
        {
          text: "Ein gemeinsames Admin-Konto für 5 Techniker",
          isSecure: false,
        },
        {
          text: "Vierteljährliches Anti-Phishing-Training für alle Mitarbeiter",
          isSecure: true,
        },
      ],
    },

    // ──────────── Level 5 ────────────
    level5: {
      title: "Stufe 5: Die finale Entschlüsselung",
      description:
        "[ 15.12.2023 - 14:00 Uhr MEZ ]\nDie Backups sind sauber. Es bleibt nur noch eine letzte Nachricht der Gruppe LockBit 3.0. Verwenden Sie das Brute-Force-Tool, um die Verschiebung zu finden und die Nachricht zu entschlüsseln.",
      labelEncrypted: "VERSCHLÜSSELTE NACHRICHT:",
      labelDecrypting: "ENTSCHLÜSSELUNGSVERSUCH:",
      labelShift: "VERSCHIEBUNG:",
      btnTest: "[ SCHLÜSSEL TESTEN ]",
      hint: "Hinweis: Der Buchstabe 'D' verschlüsselt ergibt 'K'...",
      targetPhrase: "DIE BESTE VERTEIDIGUNG BIST DU",
    },

    // ──────────── PedagogicalBox ────────────
    pedagogical: {
      continue: "[UNTERSUCHUNG FORTSETZEN]",
      reflexes: {
        1: {
          title: "CYBER-REFLEX #1",
          content: `Überprüfen Sie immer die genaue URL, bevor Sie klicken. Ein einziges geändertes Zeichen kann zu einer Piraten-Website führen. „mlcrosoft" ist nicht „microsoft". Fahren Sie über Links, überprüfen Sie Domains. Der Angreifer ist ins Netzwerk eingedrungen.`,
        },
        2: {
          titleOk: "CYBER-REFLEX #2",
          titleFail: "ZEIT ABGELAUFEN — DER ANGREIFER RÜCKT VOR",
          content:
            "Kontinuierliche Log-Überwachung ist unerlässlich. Schwache Signale — ungewöhnliche Verbindungen, Rechteerweiterungen, abnormaler ausgehender Datenverkehr — sind oft die ersten Anzeichen eines Einbruchs.",
        },
        3: {
          title: "CYBER-REFLEX #3",
          content:
            "Bei einem Cyberangriff — NIEMALS das Lösegeld zahlen. Isolieren, alarmieren (Behörden, Cyber-Dienstleister), Backups in einer sauberen Zone prüfen und transparent kommunizieren.",
        },
        4: {
          title: "CYBER-REFLEX #4",
          content:
            "80 % der Cyberangriffe nutzen menschliche Schwachstellen aus. MFA, einzigartige Passwörter, Updates, Anti-Phishing-Training: Diese einfachen Gewohnheiten sind Ihre erste Verteidigungslinie.",
        },
        5: {
          title: "CYBER-REFLEX #5",
          content:
            "Verschlüsselung schützt Ihre Daten. Aber wenn Ransomware sie gegen Sie einsetzt, können Sie sich nur mit sauberen Backups und vorausschauender Vorbereitung retten. Die beste Verteidigung sind Sie selbst.",
        },
      },
    },

    // ──────────── ScoreScreen ────────────
    scoreScreen: {
      title: "EINBRUCH EINGEDÄMMT",
      grades: {
        legend: "SOC-LEGENDE",
        expert: "CYBER-EXPERTE",
        confirmed: "ERFAHRENER ANALYST",
        junior: "JUNIOR-ANALYST",
      },
      labelGrade: "ERREICHTER RANG",
      labelTime: "REAKTIONSZEIT",
      reflexesTitle: "Ihre 5 Überlebensreflexe:",
      reflexes: [
        "URL: Jeden Buchstaben prüfen.",
        "Überwachung: Schwache Signale in Logs erkennen.",
        "Krisenmanagement: Nicht zahlen, isolieren, alarmieren.",
        "Hygiene: MFA und Updates sind unverzichtbar.",
        "Backups: Ihre einzige Rettung vor Ransomware.",
      ],
      story1:
        "In der Nacht vom 7. auf den 8. Dezember 2023 hat sich diese Geschichte wirklich ereignet. Coaxis, ein KMU im Lot-et-Garonne, wurde von LockBit getroffen.",
      story2:
        "350.000 Unternehmen lahmgelegt. 5 Millionen Dollar Lösegeld gefordert.\nSie haben nicht gezahlt. Sie haben alles in einem Monat wiederaufgebaut.",
      story3: "Die beste Verteidigung sind Sie selbst.",
      docLink: "🎬 Die vollständige Dokumentation ansehen",
    },

    // ──────────── ShareButton ────────────
    shareButton: {
      label: "MEINE PUNKTZAHL AUF LINKEDIN TEILEN",
      message: (score: string, time: string) =>
        `🔐 Ich habe gerade das Escape Game „Don't Go to the Police" abgeschlossen – und den Rang ${score} in ${time} erreicht!

5 Stufen, um einen Cyberangriff von innen zu erleben und zu verstehen, warum Cybersicherheit UNS ALLE betrifft.

Inspiriert vom echten LockBit-Angriff auf Coaxis im Dezember 2023, erzählt in der Dokumentation von @Orange Cyberdefense.

🎬 Dokumentation ansehen: https://dontgotothepolice.orangecyberdefense.com
🎮 Das Escape Game spielen: https://dontgotothepolice.vercel.app/

#DontGoToThePolice #OrangeCyberdefense #Orange`,
    },
  },
} as const;

export type Translations = typeof translations.fr;

export default translations;
