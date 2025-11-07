export interface iItem {
  id: number
  object: string
  url: string
  data_updated_at: string
  data: iData
  assignments: iAssignments
}

export interface iData {
  created_at: string
  level: number
  slug: string
  hidden_at: any
  document_url: string
  characters: string
  character_images: iCharacterImage[]
  meanings: iMeaning[]
  auxiliary_meanings: any[]
  amalgamation_subject_ids: number[]
  meaning_mnemonic: string
  lesson_position: number
  spaced_repetition_system_id: number
}

export interface iCharacterImage {
  url: string
  metadata: iMetadata
  content_type: string
}

export interface iMetadata {
  color?: string
  dimensions?: string
  style_name?: string
  inline_styles?: boolean
}

export interface iMeaning {
  meaning: string
  primary: boolean
  accepted_answer: boolean
}

export interface iAssignments {
  created_at: string
  subject_id: number
  subject_type: string
  srs_stage: number
  unlocked_at: string
  started_at: string
  passed_at: string
  burned_at: string
  available_at: any
  resurrected_at: any
  hidden: boolean
}
