const cardData = [
  {
    id: 1,
    image: "/images/PrambananTemple.jpeg",
    title: "Prambanan Temple",
    desc: " More Than Just Clothing, reflects social status and cultural heritage.",
    hasOverlay: true,
  },
  {
    id: 2,
    image: "/images/BesakihTemple.jpeg",
    title: "Besakih Temple",
    desc: "The Mother Temple of Bali, standing in spiritual harmony with Mount Agung.",
    hasOverlay: true,
    streetViewUrl:
      "https://www.google.com/maps/place/Candi+Prambanan/@-7.7520461,110.4908491,3a,75y,84.32h,72.33t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgICcxrKbxQE!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAB8u6HYr8Tj2NHRHDGKXfGwxF1sDNbV2C2jqOuoCF0dLMCllWLGvPOXuypZLPh1kpUybf5qRa6Gz3EQ1g9kBDCBv1IMFtJQznC6j0I9YvGfxOLgcCXtmQfeBKr90WbI8IbC-N-TcobdynA%3Dw900-h600-k-no-pi17.67056544171831-ya355.774028205843-ro0-fo100!7i6912!8i3456!4m6!3m5!1s0x2e7a5ae3dbd859d1:0x19e7a03b25955a2d!8m2!3d-7.7520206!4d110.4914674!16zL20vMDJzMF80?entry=ttu&g_ep=EgoyMDI1MDcyMi4wIKXMDSoASAFQAw%3D%3",
  },
  {
    id: 3,
    image: "/images/TanaToraja.jpeg",
    title: "Tana Toraja",
    desc: "A land of living traditions, where rituals celebrate both life and death.",
    hasOverlay: true,
    streetViewUrl:
      "https://www.google.com/maps/place/Kete+Kesu,+Paepalean,+Kec.+Sanggalangi,+Kabupaten+Toraja+Utara,+Sulawesi+Selatan/@-2.9965105,119.9103673,3a,75y,264.35h,85.4t/data=!3m7!1e1!3m5!1sG4hPCM4erIc06dNi8drurA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D4.599603245577839%26panoid%3DG4hPCM4erIc06dNi8drurA%26yaw%3D264.34707754126777!7i13312!8i6656!4m6!3m5!1s0x2d93e909bed5673b:0xb8d54bda6bbee9dc!8m2!3d-3.0011754!4d119.912245!16s%2Fg%2F11vk5hvq4?entry=ttu&g_ep=EgoyMDI1MDcyMi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    id: 4,
    image: "/images/Keraton.jpeg",
    title: "Kraton Yogyakarta",
    desc: "The heart of Javanese culture, where tradition, power, and philosophy unite!",
    hasOverlay: true,
    streetViewUrl:
      "https://www.google.com/maps/place/Karaton+Ngayogyakarta+Hadiningrat/@-7.8055976,110.3642357,3a,75y,195.03h,95.95t/data=!3m10!1e1!3m8!1sM067GXdZDEpplISTEVgpPA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-5.949036382250341%26panoid%3DM067GXdZDEpplISTEVgpPA%26yaw%3D195.0300356981243!7i13312!8i6656!9m2!1b1!2i39!4m6!3m5!1s0x2e7a5796db06c7ef:0x395271cf052b276c!8m2!3d-7.8052845!4d110.3642031!16s%2Fm%2F0vb3k_5?entry=ttu&g_ep=EgoyMDI1MDcyMi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    id: 5,
    image: "/images/RumahGadang.jpeg",
    title: "Rumah Gadang",
    desc: "From village stages to international platforms, wayang golek continues to tell timeless local wisdom!",
    hasOverlay: true,
    streetViewUrl:
      "https://www.google.com/maps/place/Rumah+Gadang+Sungai+Beringin/@-0.2214319,100.584947,3a,75y,97.29h,96.46t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgIDkpYC6DQ!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAB8u6HbZnpJ2sk0oVx1qOO9vT8lUG810LRNj1mx0DHOAKu9UCxjchFyVSarrD8t-g_SBbCq5D0GkWbznb56MZAtQM3lm1Q2dXSB99Tj0NHs8TSM-bQZRJKaN4jvAYibgABHgjjxkDIu5%3Dw900-h600-k-no-pi-6.464095873926837-ya6.292396448944473-ro0-fo100!7i8704!8i4352!4m10!1m2!2m1!1swisata+rumah+gadang!3m6!1s0x2fd54b62be9fa557:0xa24257d74a5f9a1e!8m2!3d-0.2214319!4d100.584947!15sChN3aXNhdGEgcnVtYWggZ2FkYW5nWhUiE3dpc2F0YSBydW1haCBnYWRhbmeSARJ0b3VyaXN0X2F0dHJhY3Rpb26aASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUlNNM05QYlVWUkVBRaoBVRABKhciE3dpc2F0YSBydW1haCBnYWRhbmcoJjIfEAEiG2YgN8UvEu8fTnrC2zUCbGQy4tYufqWusr2tbTIXEAIiE3dpc2F0YSBydW1haCBnYWRhbmfgAQD6AQQIABA9!16s%2Fg%2F11b72fx8dy?entry=ttu&g_ep=EgoyMDI1MDcyMi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    id: 6,
    image: "/images/Trunyan.jpeg",
    title: "Desa Trunyan",
    desc: "Where the dead rest above ground, and ancient Balinese Aga traditions live untouched by time.",
    hasOverlay: true,
    streetViewUrl: "https://maps.app.goo.gl/neFJCfruGrP5G6Rg9",
  },
  // dst...
];

export default cardData;
