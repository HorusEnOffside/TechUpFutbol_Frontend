import React, { useState, useRef } from "react";
import { RegisterSteps } from "./RegisterSteps";
import { User, Calendar, Venus, Briefcase, BookOpen, Shield, Hash, Mail, Lock, Camera } from "lucide-react";
import PlayerService from "../services/player.service";
import type { StudentPlayerDTO, PlayerDTO } from "../types/player";

interface RegisterFormProps {
  onSwitch: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitch }) => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<any>({});
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const fotoRef = useRef<HTMLInputElement>(null);

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [submitted, setSubmitted] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Validación de cada paso y mensajes de error
  const getStepErrors = () => {
    const errs: any = {};
    if (step === 0) {
      if (!values.name) errs.name = "El nombre es obligatorio";
      if (!values.birth) errs.birth = "La fecha es obligatoria";
      if (!values.gender) errs.gender = "El género es obligatorio";
    }
    if (step === 1) {
      if (!values.tipo) errs.tipo = "Selecciona un tipo";
      if (["estudiante", "profesor", "graduado"].includes(values.tipo) && !values.carrera) errs.carrera = "Selecciona una carrera";
      if (values.tipo === "estudiante" && !values.semestre) errs.semestre = "El semestre es obligatorio";
    }
    if (step === 2) {
      if (!values.posicion) errs.posicion = "Selecciona una posición";
      if (!values.dorsal) errs.dorsal = "El dorsal es obligatorio";
    }
    if (step === 3) {
      if (!values.email) errs.email = "El correo es obligatorio";
      if (!values.password) errs.password = "La contraseña es obligatoria";
      if (!values.password2) errs.password2 = "Confirma tu contraseña";
      if (values.password && values.password2 && values.password !== values.password2) errs.password2 = "Las contraseñas no coinciden";
    }
    return errs;
  };

  const validateStep = () => {
    const errs = getStepErrors();
    return Object.keys(errs).length === 0;
  };
  const [loading, setLoading] = useState(false);

  // Mapeo de valores del form al formato del backend
  const GENDER_MAP: Record<string, 'MALE' | 'FEMALE'> = {
    masculino: 'MALE', femenino: 'FEMALE', otro: 'MALE',
  };
  const POSITION_MAP: Record<string, 'GOALKEEPER' | 'DEFENDER' | 'MIDFIELDER' | 'FORWARD'> = {
    portero: 'GOALKEEPER', defensa: 'DEFENDER', mediocampo: 'MIDFIELDER', delantero: 'FORWARD',
  };
  const CAREER_MAP: Record<string, string> = {
    sistemas:      'INGENIERIA_DE_SISTEMAS',
    ia:            'INTELIGENCIA_ARTIFICIAL',
    ciberseguridad:'CIBERSEGURIDAD',
    estadistica:   'ESTADISTICA',
  };

  const handleFotoChange = (file: File) => {
    setFoto(file);
    setFotoPreview(URL.createObjectURL(file));
  };

  const handleChange = (field: string, value: any) => {
    setValues((prev: any) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleNext = () => {
    setSubmitted(true);
    if (validateStep()) {
      setStep((s) => s + 1);
      setTouched({});
      setSubmitted(false);
    }
  };
  const handleBack = () => {
    setStep((s) => s - 1);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!validateStep()) return;
    setLoading(true);
    setApiError(null);
    try {
      const base = {
        name:         values.name,
        mail:         values.email,
        dateOfBirth:  values.birth,
        gender:       GENDER_MAP[values.gender] ?? 'MALE',
        password:     values.password,
        dorsalNumber: Number(values.dorsal),
        position:     POSITION_MAP[values.posicion],
        career:       CAREER_MAP[values.carrera] ?? 'INGENIERIA_DE_SISTEMAS',
      };

      if (values.tipo === 'estudiante') {
        const payload: StudentPlayerDTO = { ...base, semester: Number(values.semestre) };
        await PlayerService.createSportsProfileStudent(payload, foto);
      } else if (values.tipo === 'docente') {
        await PlayerService.createSportsProfileTeacher(base as PlayerDTO, foto);
      } else if (values.tipo === 'familiar') {
        await PlayerService.createSportsProfileFamiliar(base as PlayerDTO, foto);
      } else {
        await PlayerService.createSportsProfileGraduate(base as PlayerDTO, foto);
      }

      setSuccessMsg('¡Cuenta creada! Ya puedes iniciar sesión.');
      setTimeout(() => onSwitch(), 2000);
    } catch (err: any) {
      setApiError(err?.message ?? 'Error al crear la cuenta. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
      <h2 className="text-4xl font-bold mb-3 text-center text-[#071F4A]">Crear Cuenta</h2>
      <h3 className="text-center text-sm mb-4 text-gray-600">Únete al torneo Tech Cup Fútbol</h3>
      {/* Barra de progreso y paso */}
      <div className="mb-8">
        <div className="text-center text-gray-700 font-medium mb-2">
          Paso {step + 1} de 4
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#17A65B] to-[#144C9F] transition-all duration-500"
            style={{ width: `${((step + 1) / 4) * 100}%` }}
          />
        </div>
      </div>
      <RegisterSteps step={step}>
        {/* Paso 1 */}
        <div>
          <div className="mb-4">
            <label htmlFor="register-name" className="block mb-1 font-semibold">Nombre completo</label>
            <div>
              <div className="flex items-center bg-[#F7F9FA] border border-gray-200 rounded-xl px-4 py-3">
                <User className="w-5 h-5 text-gray-400 mr-2" />
                <input id="register-name" className={`flex-1 bg-transparent outline-none border-none text-[#071F4A] placeholder-gray-400 font-medium ${step === 0 && getStepErrors().name ? 'border-b-2 border-red-500' : ''}`} value={values.name || ""} onChange={e => handleChange("name", e.target.value)} placeholder="Nombre completo" />
              </div>
              {step === 0 && getStepErrors().name && (touched.name || submitted) && <div className="text-red-500 text-xs mt-1 ml-1">{getStepErrors().name}</div>}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="register-birth" className="block mb-1 font-semibold">Fecha de nacimiento</label>
            <div>
              <div className="flex items-center bg-[#F7F9FA] border border-gray-200 rounded-xl px-4 py-3">
                <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                <input id="register-birth" type="date" className={`flex-1 bg-transparent outline-none border-none text-[#071F4A] font-medium ${step === 0 && getStepErrors().birth ? 'border-b-2 border-red-500' : ''}`} value={values.birth || ""} onChange={e => handleChange("birth", e.target.value)} />
              </div>
              {step === 0 && getStepErrors().birth && (touched.birth || submitted) && <div className="text-red-500 text-xs mt-1 ml-1">{getStepErrors().birth}</div>}
            </div>
          </div>
          <div className="mb-8">
            <label htmlFor="register-gender" className="block mb-1 font-semibold">Género</label>
            <div>
              <div className="flex items-center bg-[#F7F9FA] border border-gray-200 rounded-xl px-4 py-3">
                <Venus className="w-5 h-5 text-gray-400 mr-2" />
                <select
                  id="register-gender"
                  className={`flex-1 bg-transparent outline-none border-none text-[#071F4A] font-medium appearance-none cursor-pointer focus:ring-2 focus:ring-[#17A65B] focus:border-[#17A65B] ${step === 0 && getStepErrors().gender ? 'border-b-2 border-red-500' : ''}`}
                  value={values.gender || ""}
                  onChange={e => handleChange("gender", e.target.value)}
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                >
                  <option value="" className="text-gray-400">Selecciona tu género</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              {step === 0 && getStepErrors().gender && (touched.gender || submitted) && <div className="text-red-500 text-xs mt-1 ml-1">{getStepErrors().gender}</div>}
            </div>
          </div>
          <button
            type="button"
            className={`w-full bg-gradient-to-r from-[#17A65B] to-[#144C9F] text-white font-bold py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed`}
            onClick={handleNext}
            disabled={!validateStep()}
          >
            Siguiente
          </button>
        </div>
        {/* Paso 2 */}
        <div>
          <div className="mb-4">
            <label htmlFor="register-tipo" className="block mb-1 font-semibold">Tipo de usuario</label>
            <div>
              <div className="flex items-center bg-[#F7F9FA] border border-gray-200 rounded-xl px-4 py-3">
                <Briefcase className="w-5 h-5 text-gray-400 mr-2" />
                <select
                  id="register-tipo"
                  className={`flex-1 bg-transparent outline-none border-none text-[#071F4A] font-medium appearance-none cursor-pointer focus:ring-2 focus:ring-[#17A65B] focus:border-[#17A65B] ${step === 1 && getStepErrors().tipo ? 'border-b-2 border-red-500' : ''}`}
                  value={values.tipo || ""}
                  onChange={e => handleChange("tipo", e.target.value)}
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                >
                  <option value="" className="text-gray-400">Selecciona tu tipo</option>
                  <option value="estudiante">Estudiante</option>
                  <option value="profesor">Profesor</option>
                  <option value="graduado">Graduado</option>
                  <option value="familiar">Familiar</option>
                </select>
              </div>
              {step === 1 && getStepErrors().tipo && <div className="text-red-500 text-xs mt-1 ml-1">{getStepErrors().tipo}</div>}
            </div>
          </div>
          {(values.tipo === "estudiante" || values.tipo === "profesor" || values.tipo === "graduado") && (
            <div className="mb-4">
              <label htmlFor="register-carrera" className="block mb-1 font-semibold">Carrera</label>
              <div>
                <div className="flex items-center bg-[#F7F9FA] border border-gray-200 rounded-xl px-4 py-3">
                  <BookOpen className="w-5 h-5 text-gray-400 mr-2" />
                  <select
                    id="register-carrera"
                    className={`flex-1 bg-transparent outline-none border-none text-[#071F4A] font-medium appearance-none cursor-pointer focus:ring-2 focus:ring-[#17A65B] focus:border-[#17A65B] ${(step === 1 && (["estudiante", "profesor", "graduado"].includes(values.tipo)) && getStepErrors().carrera) ? 'border-b-2 border-red-500' : ''}`}
                    value={values.carrera || ""}
                    onChange={e => handleChange("carrera", e.target.value)}
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                  >
                    <option value="" className="text-gray-400">Selecciona tu carrera</option>
                    <option value="sistemas">Ingeniería de Sistemas</option>
                    <option value="ia">Inteligencia Artificial</option>
                    <option value="ciberseguridad">Ciberseguridad</option>
                    <option value="estadistica">Estadística</option>
                  </select>
                </div>
                {step === 1 && (["estudiante", "profesor", "graduado"].includes(values.tipo)) && getStepErrors().carrera && <div className="text-red-500 text-xs mt-1 ml-1">{getStepErrors().carrera}</div>}
              </div>
            </div>
          )}
          {values.tipo === "estudiante" && (
            <div className="mb-4">
              <label htmlFor="register-semestre" className="block mb-1 font-semibold">Semestre</label>
              <div>
                <div className="flex items-center bg-[#F7F9FA] border border-gray-200 rounded-xl px-4 py-3">
                  <BookOpen className="w-5 h-5 text-gray-400 mr-2" />
                  <input id="register-semestre" type="number" min={1} max={12} className={`flex-1 bg-transparent outline-none border-none text-[#071F4A] font-medium ${(step === 1 && values.tipo === 'estudiante' && getStepErrors().semestre) ? 'border-b-2 border-red-500' : ''}`} value={values.semestre || ""} onChange={e => handleChange("semestre", e.target.value)} placeholder="Semestre" />
                </div>
                {step === 1 && values.tipo === 'estudiante' && getStepErrors().semestre && <div className="text-red-500 text-xs mt-1 ml-1">{getStepErrors().semestre}</div>}
              </div>
            </div>
          )}
          <div className="flex gap-2 mt-8">
            <button type="button" className="w-1/2 bg-gray-200 text-[#071F4A] font-bold py-2 rounded-lg" onClick={handleBack}>Atrás</button>
            <button
              type="button"
              className={`w-1/2 bg-gradient-to-r from-[#17A65B] to-[#144C9F] text-white font-bold py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed`}
              onClick={handleNext}
              disabled={!validateStep()}
            >
              Siguiente
            </button>
          </div>
        </div>
        {/* Paso 3 */}
        <div>
          <div className="mb-4">
            <label htmlFor="register-posicion" className="block mb-1 font-semibold">Posición</label>
            <div>
              <div className="flex items-center bg-[#F7F9FA] border border-gray-200 rounded-xl px-4 py-3">
                <Shield className="w-5 h-5 text-gray-400 mr-2" />
                <select
                  id="register-posicion"
                  className={`flex-1 bg-transparent outline-none border-none text-[#071F4A] font-medium appearance-none cursor-pointer focus:ring-2 focus:ring-[#17A65B] focus:border-[#17A65B] ${step === 2 && getStepErrors().posicion ? 'border-b-2 border-red-500' : ''}`}
                  value={values.posicion || ""}
                  onChange={e => handleChange("posicion", e.target.value)}
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                >
                  <option value="" className="text-gray-400">Selecciona la posición</option>
                  <option value="portero">Portero</option>
                  <option value="defensa">Defensa</option>
                  <option value="mediocampo">Mediocampo</option>
                  <option value="delantero">Delantero</option>
                </select>
              </div>
              {step === 2 && getStepErrors().posicion && <div className="text-red-500 text-xs mt-1 ml-1">{getStepErrors().posicion}</div>}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="register-dorsal" className="block mb-1 font-semibold">Número de dorsal</label>
            <div>
              <div className="flex items-center bg-[#F7F9FA] border border-gray-200 rounded-xl px-4 py-3">
                <Hash className="w-5 h-5 text-gray-400 mr-2" />
                <input id="register-dorsal" type="number" min={1} max={99} className={`flex-1 bg-transparent outline-none border-none text-[#071F4A] font-medium ${step === 2 && getStepErrors().dorsal ? 'border-b-2 border-red-500' : ''}`} value={values.dorsal || ""} onChange={e => handleChange("dorsal", e.target.value)} placeholder="Dorsal" />
              </div>
              {step === 2 && getStepErrors().dorsal && <div className="text-red-500 text-xs mt-1 ml-1">{getStepErrors().dorsal}</div>}
            </div>
          </div>
          {/* Foto de perfil — opcional */}
          <div className="mb-8">
            <label className="block mb-1 font-semibold">Foto de perfil <span className="text-gray-400 font-normal text-xs">(opcional)</span></label>
            <button type="button" onClick={() => fotoRef.current?.click()}
              className="w-full flex items-center gap-3 bg-[#F7F9FA] border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-100 transition">
              {fotoPreview
                ? <img src={fotoPreview} alt="preview" className="w-8 h-8 rounded-full object-cover" />
                : <Camera className="w-5 h-5 text-gray-400" />}
              <span className="text-sm text-gray-500 truncate">{foto ? foto.name : 'Subir foto'}</span>
            </button>
            <input ref={fotoRef} type="file" accept="image/*" className="hidden"
              onChange={e => { if (e.target.files?.[0]) handleFotoChange(e.target.files[0]); }} />
          </div>
          <div className="flex gap-2">
            <button type="button" className="w-1/2 bg-gray-200 text-[#071F4A] font-bold py-2 rounded-lg" onClick={handleBack}>Atrás</button>
            <button
              type="button"
              className={`w-1/2 bg-gradient-to-r from-[#17A65B] to-[#144C9F] text-white font-bold py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed`}
              onClick={handleNext}
              disabled={!validateStep()}
            >
              Siguiente
            </button>
          </div>
        </div>
        {/* Paso 4 */}
        <div>
          <div className="mb-4">
            <label htmlFor="register-email" className="block mb-1 font-semibold">Correo electrónico</label>
            <div>
              <div className="flex items-center bg-[#F7F9FA] border border-gray-200 rounded-xl px-4 py-3">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <input id="register-email" className={`flex-1 bg-transparent outline-none border-none text-[#071F4A] placeholder-gray-400 font-medium ${step === 3 && getStepErrors().email ? 'border-b-2 border-red-500' : ''}`} value={values.email || ""} onChange={e => handleChange("email", e.target.value)} placeholder="correo@escuela.edu.co" />
              </div>
              {step === 3 && getStepErrors().email && <div className="text-red-500 text-xs mt-1 ml-1">{getStepErrors().email}</div>}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="register-password" className="block mb-1 font-semibold">Contraseña</label>
            <div>
              <div className="flex items-center bg-[#F7F9FA] border border-gray-200 rounded-xl px-4 py-3">
                <Lock className="w-5 h-5 text-gray-400 mr-2" />
                <input id="register-password" type="password" className={`flex-1 bg-transparent outline-none border-none text-[#071F4A] placeholder-gray-400 font-medium ${step === 3 && getStepErrors().password ? 'border-b-2 border-red-500' : ''}`} value={values.password || ""} onChange={e => handleChange("password", e.target.value)} placeholder="••••••••" />
              </div>
              {step === 3 && getStepErrors().password && <div className="text-red-500 text-xs mt-1 ml-1">{getStepErrors().password}</div>}
            </div>
          </div>
          <div className="mb-8">
            <label htmlFor="register-password2" className="block mb-1 font-semibold">Confirmar contraseña</label>
            <div>
              <div className="flex items-center bg-[#F7F9FA] border border-gray-200 rounded-xl px-4 py-3">
                <Lock className="w-5 h-5 text-gray-400 mr-2" />
                <input id="register-password2" type="password" className={`flex-1 bg-transparent outline-none border-none text-[#071F4A] placeholder-gray-400 font-medium ${(step === 3 && getStepErrors().password2) ? 'border-b-2 border-red-500' : ''}`} value={values.password2 || ""} onChange={e => handleChange("password2", e.target.value)} placeholder="••••••••" />
              </div>
              {step === 3 && getStepErrors().password2 && <div className="text-red-500 text-xs mt-1 ml-1">{getStepErrors().password2}</div>}
            </div>
          </div>
          {apiError && (
            <div className="mb-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {apiError}
            </div>
          )}
          {successMsg && (
            <div className="mb-3 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-semibold">
              {successMsg}
            </div>
          )}
          <div className="flex gap-2">
            <button type="button" className="w-1/2 bg-gray-200 text-[#071F4A] font-bold py-2 rounded-lg" onClick={handleBack}>Atrás</button>
            <button
              type="submit"
              className={`w-1/2 bg-gradient-to-r from-[#144C9F] to-[#071F4A] text-white font-bold py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed`}
              disabled={loading || !validateStep()}
            >
              {loading ? 'Creando...' : 'Crear Cuenta'}
            </button>
          </div>
        </div>
      </RegisterSteps>
    </form>
  );
};

export default RegisterForm;
