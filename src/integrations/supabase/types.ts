export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      crop_data: {
        Row: {
          created_at: string | null
          crop_name: string
          diseases: Json | null
          fertilizers: string | null
          id: string
          region: string
          varieties: Json | null
        }
        Insert: {
          created_at?: string | null
          crop_name: string
          diseases?: Json | null
          fertilizers?: string | null
          id?: string
          region: string
          varieties?: Json | null
        }
        Update: {
          created_at?: string | null
          crop_name?: string
          diseases?: Json | null
          fertilizers?: string | null
          id?: string
          region?: string
          varieties?: Json | null
        }
        Relationships: []
      }
      crop_prices: {
        Row: {
          crop_name: string
          current_price: number
          forecast_price: number
          id: string
          previous_price: number
          region: string
          unit: string
          updated_at: string
        }
        Insert: {
          crop_name: string
          current_price: number
          forecast_price: number
          id?: string
          previous_price: number
          region: string
          unit?: string
          updated_at?: string
        }
        Update: {
          crop_name?: string
          current_price?: number
          forecast_price?: number
          id?: string
          previous_price?: number
          region?: string
          unit?: string
          updated_at?: string
        }
        Relationships: []
      }
      soil_data: {
        Row: {
          coordinates: Json | null
          created_at: string | null
          id: string
          location: string
          nitrogen: number | null
          organic_matter: number | null
          ph: number | null
          phosphorus: number | null
          potassium: number | null
          predominant_type: string | null
          texture: string | null
        }
        Insert: {
          coordinates?: Json | null
          created_at?: string | null
          id?: string
          location: string
          nitrogen?: number | null
          organic_matter?: number | null
          ph?: number | null
          phosphorus?: number | null
          potassium?: number | null
          predominant_type?: string | null
          texture?: string | null
        }
        Update: {
          coordinates?: Json | null
          created_at?: string | null
          id?: string
          location?: string
          nitrogen?: number | null
          organic_matter?: number | null
          ph?: number | null
          phosphorus?: number | null
          potassium?: number | null
          predominant_type?: string | null
          texture?: string | null
        }
        Relationships: []
      }
      weather_forecasts: {
        Row: {
          created_at: string | null
          expires_at: string | null
          forecast_data: Json | null
          id: string
          location: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          forecast_data?: Json | null
          id?: string
          location: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          forecast_data?: Json | null
          id?: string
          location?: string
        }
        Relationships: []
      }
      yield_predictions: {
        Row: {
          area: number
          confidence_level: number | null
          created_at: string | null
          crop_name: string
          id: string
          predicted_yield: number | null
          region: string
          soil_type: string | null
          user_id: string | null
        }
        Insert: {
          area: number
          confidence_level?: number | null
          created_at?: string | null
          crop_name: string
          id?: string
          predicted_yield?: number | null
          region: string
          soil_type?: string | null
          user_id?: string | null
        }
        Update: {
          area?: number
          confidence_level?: number | null
          created_at?: string | null
          crop_name?: string
          id?: string
          predicted_yield?: number | null
          region?: string
          soil_type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
