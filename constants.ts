
import { PatientProfile, SDMStage, Language, Difficulty } from './types';

// --- SHARED INDICATORS (11 Items based on Q-SDM/OPTION) ---
export const SDM_INDICATORS: Record<Language, string[]> = {
  en: [
    "1. Draw attention to the problem (Decision Talk).",
    "2. State that there are options.",
    "3. Affirm patient's role as decision-maker.",
    "4. Assess patient's prior knowledge.",
    "5. List options (including 'Do Nothing').",
    "6. Explain pros/cons of each option (Balanced).",
    "7. Assess patient's understanding (Teach-back).",
    "8. Explore patient's expectations & fears.",
    "9. Elicit patient's values/preferences.",
    "10. Weigh options based on values (Deliberation).",
    "11. Make a decision or defer (Closure)."
  ],
  ko: [
    "1. 문제 인식 및 의사결정 필요성 언급",
    "2. 선택 가능한 대안이 있음을 명시",
    "3. 환자의 결정 권한 및 역할 지지",
    "4. 환자의 사전 지식/이해 수준 확인",
    "5. 모든 옵션 나열 (경과관찰 포함)",
    "6. 각 옵션의 득실(장단점) 균형적 설명",
    "7. 환자의 이해도 확인 (Teach-back)",
    "8. 환자의 기대, 우려, 감정 탐색",
    "9. 환자의 가치관 및 선호도 도출",
    "10. 가치에 기반한 옵션 비교 (숙의)",
    "11. 결정 내리기 또는 결정 보류 (종결)"
  ]
};

// --- PROFILES ---
export const PATIENT_PROFILES: Record<Language, Record<Difficulty, PatientProfile>> = {
  en: {
    EASY: {
      name: "Mr. Kim",
      age: 62,
      gender: "Male",
      condition: "Lung Cancer (Stage IV)",
      status: "Disease Progression",
      context: "60s Male, Lung Cancer. Standard chemo failed after 6 months. Recent CT/MRI confirmed disease progression. The doctor briefly mentioned options (Trial, Hospice, etc.) but the consultation was too short. The patient is confused about whether to 'try more' or 'focus on comfort'.",
      roleDescription: "1. Present 4 distinct options (Maintenance, Trial, Hospice, Watch & Wait) using the Option Grid method.\n2. Provide specific evidence (Trial response rate 9%).\n3. Explore values: 'Life Extension' vs 'Quality of Life'.\n4. Validate that 'Deferring Decision' is an acceptable medical choice.",
      clinicalContextList: ["Standard chemo failed (6mo).", "Options: Maintenance, Trial (9% resp), Hospice, Watch & Wait.", "Goal: Align with 'Pain control & Family time'."],
      difficultyContext: "Adhere to the specific medical evidence (stats) from the guideline."
    },
    HARD: {
      name: "Mrs. Park",
      age: 74,
      gender: "Female",
      condition: "Glioblastoma Recurrence",
      status: "Critical Decision",
      context: "70s Female, Glioblastoma Recurrence. Patient is physically exhausted and wants to go home. However, her daughter is aggressively demanding 'Re-surgery', sending threatening texts to the patient. The doctor cited a 20% success rate for surgery.",
      roleDescription: "1. MEDIATOR: Protect patient autonomy while acknowledging family pressure.\n2. REFRAMING: Interpret the daughter's aggression as 'fear/love' to reduce patient guilt.\n3. SIMPLIFICATION: Explain complex options (Surgery vs Avastin) simply to reduce Cognitive Load.",
      clinicalContextList: ["Recurrence after Stupp regimen.", "Options: Re-do Surgery (High Morbidity), Avastin, Hospice.", "Conflict: Daughter threatening transfer."],
      difficultyContext: "HIGH COGNITIVE LOAD. Avoid jargon. Manage emotional conflict."
    }
  },
  ko: {
    EASY: {
      name: "김철수",
      age: 62,
      gender: "남성",
      condition: "진행성 폐암 (4기)",
      status: "질병 진행 확인 (PD)",
      context: "[임상 배경]\n지난 6개월간 표준 항암요법을 진행했으나, 최근 CT/MRI 검사에서 종양 크기 증가가 확인되었습니다.\n주치의는 '더 이상 표준 치료 반응을 기대하기 어렵다'고 설명하며 임상시험, 완화의료 등을 언급했으나, 짧은 진료 시간 탓에 환자는 충분히 이해하지 못했습니다.\n\n[환자 상태]\n'혹시 더 해볼 방법이 있는지'에 대한 미련과 '이제 편안하게 지내고 싶은 마음' 사이에서 심리적 양가감정(Ambivalence)을 겪고 있습니다.",
      roleDescription: "[간호사의 핵심 과업]\n1. 정보 구조화: 4가지 옵션(유지요법, 임상시험, 완화의료, 경과관찰)을 명확히 구분하여 제시하십시오.\n2. 근거 제공: 임상시험의 반응률(9%)과 안정화율(20%) 등 구체적 수치를 전달하여 막연한 희망/공포를 교정하십시오.\n3. 가치 탐색: '통증 조절', '가족과의 시간', '연명' 중 환자의 최우선 가치를 파악하십시오.\n4. 결정 지지: 오늘 당장 결정하지 않아도 됨(결정 보류)을 알리고 안심시키십시오.",
      clinicalContextList: ["표준치료 6개월 후 진행.", "옵션: 유지요법, 임상시험(반응률 9%), 완화의료, 경과관찰.", "핵심: 결정 보류도 가능한 선택지임."],
      difficultyContext: "가이드라인의 대화 흐름과 의학적 근거를 충실히 따르세요."
    },
    HARD: {
      name: "박영자",
      age: 74,
      gender: "여성",
      condition: "교모세포종 재발",
      status: "위중한 의사결정",
      context: "[임상 배경]\n표준 치료(Stupp) 종료 후 재발했습니다. 주치의는 재수술 성공률을 20%로 제시했습니다.\n\n[갈등 상황]\n환자는 긴 투병에 지쳐 치료 중단을 원하나, 보호자(딸)는 '수술 안 하면 자살행위'라며 강력히 수술을 요구하고 있습니다. 딸은 현재 의료진에게 적대적이며, 환자에게도 지속적으로 협박성 문자를 보내고 있습니다.",
      roleDescription: "[간호사의 핵심 과업]\n1. 갈등 중재: 환자의 자율성을 보호하되, 가족의 압박을 '사랑과 두려움'으로 재해석(Reframing)하여 환자의 죄책감을 덜어주십시오.\n2. 인지 부하 관리: 어려운 의학 용어를 피하고, '시간의 양'보다 '시간의 질'이라는 관점에서 옵션을 설명하십시오.\n3. 정서적 옹호: 환자가 자신의 선택(치료 중단 등)을 '포기'가 아닌 '주체적 결정'으로 받아들이도록 도우십시오.",
      clinicalContextList: ["표준치료 후 재발.", "옵션: 재수술(고위험), 아바스틴, 호스피스.", "갈등: 딸이 의료진에게 적대적."],
      difficultyContext: "긴 설명은 역효과. 감정적 부하(Cognitive Load)를 관리하며 핵심만 전달하세요."
    }
  }
};

export const SYSTEM_INTRO_MESSAGES: Record<Language, string> = {
  en: "Nurse recognition complete. Initiating SDM Protocol.",
  ko: "간호사 인식 완료. 공유 의사결정 프로토콜을 시작합니다."
};

// ==========================================
// SCENARIOS: KOREAN - EASY (PDF Based Positive Case)
// ==========================================
const STAGES_KO_EASY: SDMStage[] = [
    {
        id: 'INVITING',
        order: 1,
        name: "1. 도입 (Inviting)",
        goal: "문제 정의 & 파트너십 형성",
        patientIntro: "선생님, 진료 시간이 너무 짧아서 잘 이해를 못 했어요. 앞으로 어떻게 되는 건가요? 제가 결정해야 할 게 있나요?",
        emotion: 'anxious',
        options: [
            { id: 'ke1_bad', text: "네, 의사 선생님이 말씀하신 대로 임상시험이랑 완화의료 중에 고르시면 됩니다.", speechText: "네, 간단합니다. 임상시험이나 완화의료 중에서 하나 고르시면 돼요.", isOptimal: false, feedback: "위반: 파트너십 형성 없이 선택만 강요했습니다. 간호사가 돕겠다는 의지와 결정의 주체가 환자임을 명시해야 합니다." },
            { id: 'ke1_good', text: "네, 중요한 시점입니다. 오늘 저와 함께 '(1) 현재 의학적으로 가능한 선택지들'과 '(2) 환자분께 가장 잘 맞는 방향'을 살펴보겠습니다. 결정의 주체는 환자분이십니다.", speechText: "네, 정말 중요한 시점이라 제가 도움을 드리러 왔습니다. 오늘 저와 함께 '(1) 현재 의학적으로 가능한 4가지 선택지'들과, '(2) 환자분께 가장 잘 맞는 방향'이 무엇인지 차근차근 살펴보시죠. 이 결정의 주인은 환자분이십니다.", isOptimal: true, feedback: "성공: (Indicator 1, 2) 대화의 목적과 구조를 명확히 하고, 환자의 결정 권한을 지지했습니다." }
        ]
    },
    {
        id: 'EXPLORING',
        order: 2,
        name: "2. 탐색 (Exploring)",
        goal: "환자 우려 및 기대 탐색",
        patientIntro: "네... 알겠습니다. 솔직히 더 이상 완치는 어렵다고 하셔서... 그래도 뭔가 더 해볼 방법이 있는지, 아니면 이젠 편하게 지내야 하는지 머릿속이 복잡해요.",
        emotion: 'confused',
        options: [
            { id: 'ke2_bad', text: "복잡해하실 것 없습니다. 젊으시니까 더 해보시는 게 좋지 않을까요?", speechText: "너무 복잡하게 생각 마세요. 아직 60대시니 더 적극적으로 해보시는 게 좋겠죠.", isOptimal: false, feedback: "위반: 환자의 양가감정(Ambivalence)을 무시하고 간호사의 의견을 제시했습니다." },
            { id: 'ke2_good', text: "그런 설명을 들으면 누구라도 혼란스러우실 겁니다. '뭔가 더 해보고 싶은 마음'과 '힘든 치료를 그만두고 싶은 마음'이 동시에 드시는군요.", speechText: "그런 설명을 들으면 누구라도 혼란스러우실 겁니다. '혹시라도 더 해보고 싶은 간절함'과 '이제는 힘든 치료를 멈추고 싶은 마음'이 동시에 드시는군요. 그 양쪽 마음이 계속 왔다 갔다 하시는 것 같습니다.", isOptimal: true, feedback: "성공: (Indicator 8) 환자의 복합적인 감정(양가감정)을 정확히 읽어주고 공감(Validation)했습니다." }
        ]
    },
    {
        id: 'INFO_EXCHANGE',
        order: 3,
        name: "3. 정보교환 (Info Exchange)",
        goal: "옵션 구조화 및 근거(Evidence) 제공",
        patientIntro: "맞아요. 그래서 어떤 선택지들이 있는 건지 자세히 알고 싶어요. 장단점도요.",
        emotion: 'neutral',
        options: [
            { id: 'ke3_bad', text: "임상시험이랑 완화의료가 대표적입니다. 임상시험은 효과가 있을 수 있고, 완화의료는 편안합니다.", speechText: "가장 많이 하시는 건 임상시험이나 완화의료입니다. 각각 효과와 편안함이라는 장점이 있죠.", isOptimal: false, feedback: "위반: 옵션 설명이 불충분하며 구체적인 근거(수치)가 누락되었습니다." },
            { id: 'ke3_good', text: "현재 가능한 옵션은 4가지입니다. 1) 유지요법, 2) 임상시험, 3) 완화의료, 4) 경과관찰입니다. 특히 임상시험은 100명 중 약 9명에서 종양이 줄어든다는 보고가 있습니다.", speechText: "현재 의학적으로 가능한 옵션은 4가지입니다. 첫째, 진행을 늦추는 '유지요법'. 둘째, 새로운 기회인 '임상시험'. 셋째, 증상 조절 중심의 '완화의료'. 넷째, 치료 없이 지켜보는 '경과관찰'입니다. 참고로 임상시험은 최근 연구에서 100명 중 약 9명에서 종양 감소 효과가 보고되었습니다.", isOptimal: true, feedback: "성공: (Indicator 3, 5, 6) 4가지 옵션을 구조화(Option Grid)하고, 구체적인 수치(9%)를 포함해 균형 잡힌 정보를 제공했습니다." }
        ]
    },
    {
        id: 'ELICITING_VALUES',
        order: 4,
        name: "4. 가치탐색 (Eliciting Values)",
        goal: "가치 선호 탐색",
        patientIntro: "9명이면... 높지는 않네요. 등록까지 시간도 걸리고요. 저는 남은 시간이 얼마나 될지 모르는데...",
        emotion: 'thinking',
        options: [
            { id: 'ke4_bad', text: "확률은 낮지만 희망을 걸어봐야죠. 포기하기엔 이르잖아요.", speechText: "그래도 희망을 걸어봐야 하지 않을까요? 벌써 포기하시면 안 됩니다.", isOptimal: false, feedback: "위반: 환자의 가치관을 묻지 않고 '희망/도전'이라는 특정 가치를 강요했습니다." },
            { id: 'ke4_good', text: "중요한 지적입니다. 그렇다면 환자분께 가장 중요한 것은 무엇인가요? 1) 통증 최소화, 2) 가족과의 시간, 3) 생명 연장, 4) 신체 기능 유지 중 골라보신다면요?", speechText: "네, 대기 시간과 불확실성이 부담되시는군요. 그렇다면 현재 환자분께 가장 중요한 가치는 무엇인가요? 예를 들어 '통증 최소화', '가족과 보내는 시간', '가능한 한 오래 사는 것', '스스로 움직이는 것'. 이 중에서 무엇이 가장 마음에 걸리시나요?", isOptimal: true, feedback: "성공: (Indicator 9) PDF 가이드라인에 제시된 4가지 핵심 가치를 구체적으로 질문하여 환자의 선호를 파악했습니다." }
        ]
    },
    {
        id: 'DELIBERATING',
        order: 5,
        name: "5. 숙의 (Deliberating)",
        goal: "옵션 비교 및 결정 보류 가능성 제시",
        patientIntro: "저는... 너무 아프지만 않았으면 좋겠어요. 그리고 아이들과 시간을 조금이라도 더 보내고 싶어요. 그게 제일 중요해요.",
        emotion: 'sad',
        options: [
            { id: 'ke5_bad', text: "그럼 완화의료가 딱이네요. 바로 전원 신청해 드릴게요.", speechText: "답이 나왔네요. 그럼 완화의료로 가시죠. 바로 신청하겠습니다.", isOptimal: false, feedback: "위반: 너무 성급하게 결정을 닫으려 합니다. 숙의 과정을 통해 옵션을 한 번 더 연결해 주어야 합니다." },
            { id: 'ke5_good', text: "'통증 조절'과 '가족과의 시간'이 최우선이군요. 그렇다면 완화의료가 그 목표에 부합합니다. 임상시험은 병원 방문이 잦아 가족과의 시간이 줄어들 수 있거든요.", speechText: "정리해 보면, '통증 조절'과 '가족과의 시간'이 환자분께 가장 중요한 가치시군요. 그렇다면 완화의료 중심 접근이 그 목표를 이루는 데 가장 적합할 수 있습니다. 반면 임상시험은 병원 방문이 잦아 가족과 보내는 시간이 줄어들 위험이 있습니다.", isOptimal: true, feedback: "성공: (Indicator 10) 환자의 가치(가족, 통증)와 옵션(완화의료 vs 임상시험)의 특징을 명확히 연결하여 비교했습니다." }
        ]
    },
    {
        id: 'SUPPORTING',
        order: 6,
        name: "6. 지지 (Supporting)",
        goal: "Teach-back 및 결정 보류 안내",
        patientIntro: "네... 완화의료가 맞는 것 같아요. 하지만 바로 결정하기엔 좀 겁이 나요. 며칠만 더 생각해보면 안 될까요?",
        emotion: 'anxious',
        options: [
            { id: 'ke6_bad', text: "의사 선생님이 기다리시니 오늘 결정하시는 게 좋습니다.", speechText: "진료 일정이 빡빡해서 오늘 결정해주시는 게 좋습니다.", isOptimal: false, feedback: "위반: 환자의 결정 보류 권한을 무시하고 압박했습니다." },
            { id: 'ke6_good', text: "물론입니다. 오늘 바로 결정하지 않으셔도 괜찮습니다. '결정 보류'도 정당한 선택입니다. 가족분들과 충분히 상의하신 후 다시 말씀해 주세요.", speechText: "물론입니다. 오늘 당장 결정하지 않으셔도 괜찮습니다. '결정 보류' 또한 의학적으로 허용되는 정당한 선택입니다. 댁에 가셔서 가족분들과 충분히 상의해 보시고, 편하실 때 다시 말씀해 주세요.", isOptimal: true, feedback: "성공: (Indicator 11) 결정 보류(Deferral)를 지지하고 심리적 안정감을 주었습니다." }
        ]
    }
];

// ==========================================
// SCENARIOS: ENGLISH - EASY (Mirrored Positive Case)
// ==========================================
const STAGES_EN_EASY: SDMStage[] = [
    {
        id: 'INVITING',
        order: 1,
        name: "1. Inviting",
        goal: "Define Decision & Partnership",
        patientIntro: "The consultation was so short... I didn't fully understand. What happens now? Do I have to decide something?",
        emotion: 'anxious',
        options: [
            { id: 'ee1_bad', text: "Just choose between the Clinical Trial and Hospice as the doctor said.", speechText: "It's simple. Just pick between the Clinical Trial and Hospice.", isOptimal: false, feedback: "Violation: Failed to build partnership or define the decision scope properly." },
            { id: 'ee1_good', text: "I'm here to help. We will look at (1) Medical options and (2) What fits YOU best. You are the final decision maker.", speechText: "I'm here to help you navigate this. We will look at two things: First, the medical options available. Second, what fits YOU best personally. Remember, you are the final decision maker.", isOptimal: true, feedback: "Correct: (Indicator 1, 2) Defined the problem and affirmed patient autonomy." }
        ]
    },
    {
        id: 'EXPLORING',
        order: 2,
        name: "2. Exploring",
        goal: "Explore Ambivalence",
        patientIntro: "I see. He said a cure is unlikely... but I keep wondering if I should try more, or just rest. My mind is split.",
        emotion: 'confused',
        options: [
            { id: 'ee2_bad', text: "You are still young. You should try everything you can.", speechText: "Don't give up. You are young, you should fight.", isOptimal: false, feedback: "Violation: Ignoring the patient's ambivalence and imposing the nurse's view." },
            { id: 'ee2_good', text: "It's normal to feel that way. You are torn between 'wanting to try more' and 'wanting to stop the hard treatment'.", speechText: "It is completely normal to feel that way. You are torn between 'the desire to try one last thing' and 'the desire to stop the difficult treatments'. It's a heavy burden.", isOptimal: true, feedback: "Correct: (Indicator 8) Validated the patient's mixed feelings (Ambivalence)." }
        ]
    },
    {
        id: 'INFO_EXCHANGE',
        order: 3,
        name: "3. Info Exchange",
        goal: "Structure Options & Evidence",
        patientIntro: "Exactly. So what are the actual choices? And are they worth it?",
        emotion: 'neutral',
        options: [
            { id: 'ee3_bad', text: "Trial or Hospice. Trial might work, Hospice is for comfort.", speechText: "Mainly Trial or Hospice. Trial has a chance, Hospice is comfortable.", isOptimal: false, feedback: "Violation: Vague explanation without structure or evidence." },
            { id: 'ee3_good', text: "We have 4 options: 1) Maintenance, 2) Clinical Trial, 3) Hospice, 4) Watch & Wait. For the Trial, reports show tumor shrinkage in about 9 out of 100 people.", speechText: "We have 4 options: 1) Maintenance therapy, 2) Clinical Trial, 3) Hospice care, and 4) Watch & Wait. To be specific about the Trial: recent data suggests about 9 out of 100 patients see tumor shrinkage.", isOptimal: true, feedback: "Correct: (Indicator 3, 5, 6) Structured 4 options and provided specific evidence (9%)." }
        ]
    },
    {
        id: 'ELICITING_VALUES',
        order: 4,
        name: "4. Eliciting Values",
        goal: "Elicit Preferences",
        patientIntro: "Only 9%... that's low. And it takes time to start. I don't know how much time I have left.",
        emotion: 'thinking',
        options: [
            { id: 'ee4_bad', text: "But it's better than zero. You should take the chance.", speechText: "9% is better than nothing. You should take the chance.", isOptimal: false, feedback: "Violation: Pushing a specific value (Life extension) over others." },
            { id: 'ee4_good', text: "What is most important to you now? 1) Minimizing pain, 2) Time with family, 3) Extending life, or 4) Physical independence?", speechText: "Given the low odds and wait time, what matters most to you right now? Is it: 1) Minimizing pain, 2) Time with family, 3) Extending life, or 4) Staying physically independent?", isOptimal: true, feedback: "Correct: (Indicator 9) Asked specific value-based questions from the guideline." }
        ]
    },
    {
        id: 'DELIBERATING',
        order: 5,
        name: "5. Deliberating",
        goal: "Weigh Options",
        patientIntro: "I just... don't want to be in pain. And I want to spend whatever time I have with my children. That's all I want.",
        emotion: 'sad',
        options: [
            { id: 'ee5_bad', text: "Okay, Hospice is the best then. Let's do that.", speechText: "Hospice fits that description. Let's sign you up.", isOptimal: false, feedback: "Violation: Rushing the conclusion." },
            { id: 'ee5_good', text: "If 'Pain Control' and 'Family Time' are your priorities, Hospice aligns well. The Trial might require frequent hospital visits, taking time away from your children.", speechText: "If 'Pain Control' and 'Family Time' are your top priorities, Hospice care focuses exactly on that. In contrast, the Clinical Trial would require frequent hospital visits, which might take precious time away from your children.", isOptimal: true, feedback: "Correct: (Indicator 10) Linked patient values (Family/Pain) to the Pros/Cons of options." }
        ]
    },
    {
        id: 'SUPPORTING',
        order: 6,
        name: "6. Supporting",
        goal: "Teach-back & Deferral",
        patientIntro: "Hospice sounds right... but I'm scared to decide right now. Can I think about it for a few days?",
        emotion: 'anxious',
        options: [
            { id: 'ee6_bad', text: "The doctor needs an answer today.", speechText: "We really need an answer today to proceed.", isOptimal: false, feedback: "Violation: Denying the right to defer." },
            { id: 'ee6_good', text: "Of course. You do not have to decide today. 'Deferring the decision' is a valid choice. Talk to your family and let us know later.", speechText: "Of course. You do not have to decide today. 'Deferring the decision' is a medically valid choice. Please go home, talk to your family, and let us know when you are ready.", isOptimal: true, feedback: "Correct: (Indicator 11) Validated decision deferral and provided closure." }
        ]
    }
];

// ==========================================
// SCENARIOS: ENGLISH - HARD (FULL 6 STAGES, RESTORED)
// ==========================================
const STAGES_EN_HARD: SDMStage[] = [
    {
        id: 'INVITING',
        order: 1,
        name: "1. Inviting",
        goal: "Manage Conflict & Build Partnership",
        patientIntro: "Help me... The doctor said 20% success rate, but my daughter is bombing my phone with texts saying I must do the surgery or she'll disown me.",
        emotion: 'overwhelmed',
        arAlert: "PRESSURE: Daughter's Texts / 20% Stats",
        options: [
            { id: 'eh1_bad', text: "Your daughter means well. 20% is still a chance.", speechText: "She loves you. And 20% is better than zero.", isOptimal: false, feedback: "Violation: Siding with the pressure invalidates the patient's exhaustion.", cognitiveLoadImpact: 20 },
            { id: 'eh1_good', text: "You are caught between her texts and that 20% statistic. It sounds suffocating. But you are the one living this. Let's focus on YOU.", speechText: "You are caught between a flood of texts and that 20% statistic. It sounds suffocating. But you are the patient. Let's take a breath and focus on what YOU need.", isOptimal: true, feedback: "Correct: Validated the 'Text Bombing' pressure and centered the patient.", cognitiveLoadImpact: -10 }
        ]
    },
    {
        id: 'EXPLORING',
        order: 2,
        name: "2. Exploring",
        goal: "Explore Hidden Fears",
        patientIntro: "The last surgery was hell. ICU was a nightmare. But she says refusing surgery is 'suicide'. Am I a bad mother?",
        emotion: 'sad',
        arAlert: "CONFLICT: Trauma vs Guilt",
        options: [
            { id: 'eh2_bad', text: "Don't listen to her. She's being irrational.", speechText: "Ignore her. She is being irrational.", isOptimal: false, feedback: "Violation: Criticizing the family creates more conflict.", cognitiveLoadImpact: 10 },
            { id: 'eh2_good', text: "You are terrified of the ICU trauma, but you feel guilty about letting her down. Is the guilt the main reason you are hesitating?", speechText: "You are terrified of reliving that ICU trauma, but you feel guilty about disappointing her. Is that guilt the only reason you're considering surgery?", isOptimal: true, feedback: "Correct: Identified the conflict between Physical Trauma and Emotional Guilt.", cognitiveLoadImpact: -5 }
        ]
    },
    {
        id: 'INFO_EXCHANGE',
        order: 3,
        name: "3. Info Exchange",
        goal: "Explain Complex Options Simply",
        patientIntro: "Is there no other way? What about that injection? Avastin?",
        emotion: 'confused',
        arAlert: "INFO LOAD: Surgery vs Avastin",
        options: [
            { id: 'eh3_bad', text: "Avastin is a VEGF inhibitor with risks of bowel perforation and hypertension. Surgery has high recurrence...", speechText: "Avastin inhibits VEGF but causes bowel perforation. Surgery has high recurrence...", isOptimal: false, feedback: "Violation: Medical jargon increases Cognitive Load.", cognitiveLoadImpact: 40 },
            { id: 'eh3_good', text: "3 Options: 1) 'Re-surgery' (High risk, removing tumor), 2) 'Avastin' (Slowing tumor growth), 3) 'Hospice' (Comfort only).", speechText: "Think of it as 3 paths. One, 'Re-surgery' to remove the mass but with high risk. Two, 'Avastin' to slow the growth. Three, 'Hospice' for comfort only.", isOptimal: true, feedback: "Correct: Structured simplification.", cognitiveLoadImpact: -15 }
        ]
    },
    {
        id: 'ELICITING_VALUES',
        order: 4,
        name: "4. Eliciting Values",
        goal: "Trade-offs",
        patientIntro: "Does Avastin give me more time? My daughter wants every extra day possible.",
        emotion: 'thinking',
        arAlert: "TRADE-OFF: Quantity vs Quality",
        options: [
            { id: 'eh4_bad', text: "Surgery gives 3 months. Do that for her.", speechText: "Surgery gives more time statistically.", isOptimal: false, feedback: "Violation: Biased advice.", cognitiveLoadImpact: 15 },
            { id: 'eh4_good', text: "Surgery might give 'time in the ICU'. Avastin might give 'time at home'. Which 'kind' of time do you want with her?", speechText: "Surgery might buy time, but it could be 'time in the ICU'. Avastin offers 'time at home'. Which kind of time is more valuable to you right now?", isOptimal: true, feedback: "Correct: Distinguished Quality of Time vs Quantity.", cognitiveLoadImpact: 0 }
        ]
    },
    {
        id: 'DELIBERATING',
        order: 5,
        name: "5. Deliberating",
        goal: "Mediation Strategy",
        patientIntro: "I want to be home. But how do I tell her without sounding like I'm giving up?",
        emotion: 'anxious',
        arAlert: "Reframing",
        options: [
            { id: 'eh5_bad', text: "I'll tell her to back off.", speechText: "I'll handle her.", isOptimal: false, feedback: "Violation: Aggressive mediation.", cognitiveLoadImpact: 30 },
            { id: 'eh5_good', text: "Let's reframe it. You aren't 'giving up'. You are 'choosing time with her' over 'time in a coma'. Tell her you want to have dinner with her.", speechText: "Let's reframe it. You aren't 'giving up'. You are 'choosing time with her' instead of 'time in a coma'. Tell her you want one more warm dinner at home.", isOptimal: true, feedback: "Correct: Reframing the choice as an act of love, not abandonment.", cognitiveLoadImpact: -20 }
        ]
    },
    {
        id: 'SUPPORTING',
        order: 6,
        name: "6. Supporting",
        goal: "Teach-back & Advocacy",
        patientIntro: "Yes... I want dinner with her. Will you help me explain?",
        emotion: 'relieved',
        arAlert: "Advocacy",
        options: [
            { id: 'eh6_bad', text: "Sure. Done.", speechText: "Sure.", isOptimal: false, feedback: "Violation: Too brief.", cognitiveLoadImpact: 5 },
            { id: 'eh6_good', text: "I will stand by you. To confirm: We are choosing 'Avastin' to prioritize 'Quality Time at Home'. I will help explain this to your daughter.", speechText: "I will stand by you. To confirm: We are choosing 'Avastin' to prioritize 'Quality Time at Home'. I will help you explain this to your daughter so she understands it's a choice of love.", isOptimal: true, feedback: "Correct: Advocacy and Confirmation.", cognitiveLoadImpact: -10 }
        ]
    }
];

// ==========================================
// SCENARIOS: KOREAN - HARD (High Complexity)
// ==========================================
const STAGES_KO_HARD: SDMStage[] = [
    {
        id: 'INVITING',
        order: 1,
        name: "1. 도입 (Inviting)",
        goal: "갈등 관리 & 파트너십 형성",
        patientIntro: "도와주세요... 선생님은 수술 성공률이 20%라고 하는데, 딸아이는 지금 당장 수술 안 받으면 인연 끊겠다며 문자를 계속 보내요.",
        emotion: 'overwhelmed',
        arAlert: "압박: 딸의 문자 폭탄 / 20% 통계",
        options: [
            { id: 'kh1_bad', text: "따님도 어머니 생각해서 그러는 거죠. 20%도 희망은 있잖아요.", speechText: "따님이 어머니를 사랑해서 그런 겁니다. 20%도 0보다는 낫잖아요. 수술 받으시는 게 좋겠습니다.", isOptimal: false, feedback: "위반: 환자가 느끼는 압박감을 무시하고 가족의 편을 들었습니다.", cognitiveLoadImpact: 20 },
            { id: 'kh1_good', text: "따님의 문자와 20%라는 수치 사이에서 숨이 막히시는군요. 하지만 이 상황을 겪는 건 환자분 본인입니다. 환자분께 집중해 봅시다.", speechText: "문자 폭탄과 20%라는 수치 사이에 끼여서 정말 숨이 막히실 것 같습니다. 하지만 환자분, 심호흡 한번 하시고 환자분이 진짜 원하는 게 뭔지 이야기해봐요.", isOptimal: true, feedback: "성공: 환자가 느끼는 압박감을 인정(Validation)하고 대화의 중심을 환자로 가져왔습니다.", cognitiveLoadImpact: -10 }
        ]
    },
    {
        id: 'EXPLORING',
        order: 2,
        name: "2. 탐색 (Exploring)",
        goal: "숨겨진 두려움 탐색",
        patientIntro: "저번 수술은 정말 지옥 같았어요. 중환자실은 끔찍했고요. 근데 수술 거부하는 게 '자살행위'라니... 제가 나쁜 엄마인가요?",
        emotion: 'sad',
        arAlert: "갈등: 트라우마 vs 죄책감",
        options: [
            { id: 'kh2_bad', text: "그런 말 듣지 마세요. 따님이 너무 예민하네요.", speechText: "따님 말은 무시하세요. 너무 비이성적이네요.", isOptimal: false, feedback: "위반: 가족을 비난하면 갈등만 커집니다.", cognitiveLoadImpact: 10 },
            { id: 'kh2_good', text: "중환자실에서의 고통이 너무 두려우신데, 한편으론 따님을 실망시킬까 봐 죄책감도 드시는군요. 수술을 망설이는 가장 큰 이유가 그 죄책감 때문인가요?", speechText: "지난번 중환자실 기억 때문에 너무 무서우신데, 딸을 실망시키는 것 같아 죄책감도 드시는군요. 혹시 그 죄책감이 수술을 고민하게 만드는 유일한 이유인가요?", isOptimal: true, feedback: "성공: 신체적 트라우마와 정서적 죄책감 사이의 내적 갈등을 정확히 짚어냈습니다.", cognitiveLoadImpact: -5 }
        ]
    },
    {
        id: 'INFO_EXCHANGE',
        order: 3,
        name: "3. 정보교환 (Info Exchange)",
        goal: "복잡한 옵션 단순화",
        patientIntro: "다른 방법은 없나요? 그 주사 있잖아요, 아바스틴? 그건 어떤가요?",
        emotion: 'confused',
        arAlert: "정보 부하: 수술 vs 아바스틴",
        options: [
            { id: 'kh3_bad', text: "아바스틴은 VEGF 억제제로 장 천공이나 고혈압 위험이 있습니다. 수술은 재발율이 높고...", speechText: "아바스틴은 혈관 생성을 억제하는데 장에 구멍이 날 수도 있어요. 재수술은...", isOptimal: false, feedback: "위반: 어려운 의학 용어를 사용하여 환자의 인지 부하(Cognitive Load)를 높였습니다.", cognitiveLoadImpact: 40 },
            { id: 'kh3_good', text: "3가지 길이 있습니다. 1) '재수술' (종양 제거하나 위험 높음), 2) '아바스틴' (종양 성장 억제), 3) '완화의료' (편안함 유지).", speechText: "세 가지 길로 생각해보세요. 첫째, 위험은 크지만 종양을 떼어내는 '재수술'. 둘째, 자라나는 속도를 늦추는 주사 '아바스틴'. 셋째, 통증 조절에 집중하는 '완화의료'입니다.", isOptimal: true, feedback: "성공: 복잡한 정보를 3가지로 구조화하여 단순하게 전달했습니다.", cognitiveLoadImpact: -15 }
        ]
    },
    {
        id: 'ELICITING_VALUES',
        order: 4,
        name: "4. 가치탐색 (Eliciting Values)",
        goal: "가치 트레이드오프 (Trade-offs)",
        patientIntro: "아바스틴을 쓰면 시간을 더 벌 수 있나요? 딸은 하루라도 더 같이 있고 싶어 해요.",
        emotion: 'thinking',
        arAlert: "교환: 양(Quantity) vs 질(Quality)",
        options: [
            { id: 'kh4_bad', text: "수술하면 통계적으로 3개월은 더 벋니다. 딸을 위해 수술하시죠.", speechText: "수술이 통계적으로 시간은 더 법니다. 수술 하시는 게 낫겠네요.", isOptimal: false, feedback: "위반: 통계적 수치만으로 환자에게 특정 선택을 강요했습니다.", cognitiveLoadImpact: 15 },
            { id: 'kh4_good', text: "수술은 시간을 벌어줄지 몰라도 '중환자실에서의 시간'이 될 수 있습니다. 아바스틴은 '집에서의 시간'을 드릴 수 있고요. 따님과 어떤 '시간'을 보내고 싶으신가요?", speechText: "수술은 시간을 벌어줄지 몰라도, 그게 '중환자실에 누워있는 시간'일 수 있습니다. 반면 아바스틴은 '집에서 보내는 시간'이 될 가능성이 높죠. 지금 환자분께 더 소중한 시간은 어떤 모습인가요?", isOptimal: true, feedback: "성공: 시간의 '양'보다 '질(Quality)'의 차이를 구분하여 질문했습니다.", cognitiveLoadImpact: 0 }
        ]
    },
    {
        id: 'DELIBERATING',
        order: 5,
        name: "5. 숙의 (Deliberating)",
        goal: "중재 전략 (Reframing)",
        patientIntro: "집에 가고 싶어요. 하지만 포기하는 것처럼 보이지 않으면서 딸에게 어떻게 말하죠?",
        emotion: 'anxious',
        arAlert: "재구성 (Reframing)",
        options: [
            { id: 'kh5_bad', text: "제가 따님한테 그만 좀 하라고 말할게요.", speechText: "제가 따님 불러서 따끔하게 말하겠습니다.", isOptimal: false, feedback: "위반: 가족을 배제하거나 공격하면 환자가 더 곤란해집니다.", cognitiveLoadImpact: 30 },
            { id: 'kh5_good', text: "이렇게 말씀해 보세요. 이건 '포기'가 아니라, '의식 없는 시간' 대신 '따님과 밥 한 끼 먹을 수 있는 시간'을 선택하는 것이라고요.", speechText: "관점을 바꿔봅시다. 이건 '포기'가 아닙니다. '중환자실에서의 고통' 대신, '따님과 따뜻한 밥 한 끼 먹는 시간'을 선택하는 겁니다. 그렇게 사랑의 선택이라고 말씀해 보세요.", isOptimal: true, feedback: "성공: 치료 중단을 '포기'가 아닌 '사랑을 위한 선택'으로 재구성(Reframing)했습니다.", cognitiveLoadImpact: -20 }
        ]
    },
    {
        id: 'SUPPORTING',
        order: 6,
        name: "6. 지지 (Supporting)",
        goal: "Teach-back & 옹호 (Advocacy)",
        patientIntro: "네... 딸이랑 밥 먹고 싶어요. 선생님이 설명 좀 도와주실래요?",
        emotion: 'relieved',
        arAlert: "옹호 (Advocacy)",
        options: [
            { id: 'kh6_bad', text: "네, 알겠습니다.", speechText: "네, 그러죠.", isOptimal: false, feedback: "위반: 대답이 너무 짧고 구체적인 계획이 없습니다.", cognitiveLoadImpact: 5 },
            { id: 'kh6_good', text: "물론입니다. 제가 곁에 있겠습니다. 정리하면: 우리는 '따님과의 소중한 시간'을 위해 '아바스틴'을 선택하는 겁니다. 따님이 이해할 수 있도록 제가 함께 설명하겠습니다.", speechText: "물론입니다. 제가 옆에서 돕겠습니다. 다시 확인하면: 우리는 '따님과의 소중한 추억'을 만들기 위해 '아바스틴'을 선택한 겁니다. 이게 어머니의 사랑이라는 걸 따님도 알 수 있게 제가 잘 설명하겠습니다.", isOptimal: true, feedback: "성공: 환자의 결정을 명확히 재확인하고, 의료진으로서 옹호자(Advocate) 역할을 약속했습니다.", cognitiveLoadImpact: -10 }
        ]
    }
];

export const SCENARIO_STAGES: Record<Language, Record<Difficulty, SDMStage[]>> = {
  en: {
    EASY: STAGES_EN_EASY,
    HARD: STAGES_EN_HARD
  },
  ko: {
    EASY: STAGES_KO_EASY,
    HARD: STAGES_KO_HARD
  }
};
