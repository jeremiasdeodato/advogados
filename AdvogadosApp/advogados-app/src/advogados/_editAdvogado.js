import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { Senioridades, SenioridadeLabels } from '../enums/senioridades.enum';
import { Estados, EstadoLabels } from '../enums/estados.enum';

const EditAdvogado = ({ advogadoId, setAdvogadoEdited }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: '',
      dataDeNascimento: '',
      email: '',
      senioridade: Senioridades.JUNIOR,
      endereco: {
        logradouro: '',
        bairro: '',
        estado: '',
        numero: '',
        complemento: '',
        cep: '',
      },
    },
  });

  useEffect(() => {
    fetchAdvogadoData();
  }, [advogadoId]);

  const fetchAdvogadoData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/Advogados/consultar/${advogadoId}`,
      );
      if (response.data) {
        const { dataDeNascimento, ...rest } = response.data;
        const formattedData = {
          ...rest,
          dataDeNascimento: dataDeNascimento
            ? new Date(dataDeNascimento).toISOString().split('T')[0]
            : '',
        };
        Object.keys(formattedData).forEach((key) => {
          setValue(key, formattedData[key]);
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const editExistAdvogado = async (data) => {
    try {
      const payload = {
        nome: data.nome,
        dataDeNascimento: data.dataDeNascimento,
        email: data.email,
        senioridade: Number(data.senioridade),
        endereco: {
          logradouro: data.endereco.logradouro,
          bairro: data.endereco.bairro,
          estado: data.endereco.estado,
          numero: data.endereco.numero,
          complemento: data.endereco.complemento,
          cep: data.endereco.cep,
        },
      };

      const response = await axios.put(
        `http://localhost:5000/api/Advogados/atualizar/${advogadoId}`,
        payload,
      );

      if (response.status === 200) {
        setAdvogadoEdited();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="advogado-view _edit-view">
      <h1>Informações Básicas</h1>
      <div className="box">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Nome:</span>
              <input
                type="text"
                className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                placeholder="Digite o nome..."
                {...register('nome', { required: 'O nome é obrigatório' })}
              />
              {errors.nome && (
                <div className="invalid-feedback">{errors.nome.message}</div>
              )}
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Data de Nascimento:</span>
              <input
                type="date"
                className={`form-control ${
                  errors.dataDeNascimento ? 'is-invalid' : ''
                }`}
                {...register('dataDeNascimento', {
                  required: 'A data de nascimento é obrigatória',
                })}
              />
              {errors.dataDeNascimento && (
                <div className="invalid-feedback">
                  {errors.dataDeNascimento.message}
                </div>
              )}
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Email:</span>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Digite o e-mail..."
                {...register('email', {
                  required: 'O e-mail é obrigatório',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'O e-mail é inválido',
                  },
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Senioridade:</span>
              <select
                className="form-control"
                {...register('senioridade', {
                  required: 'A senioridade é obrigatória',
                })}
              >
                {Object.entries(SenioridadeLabels).map(([value, label]) => (
                  <option key={value} value={Number(value)}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.senioridade && (
                <div className="invalid-feedback">
                  {errors.senioridade.message}
                </div>
              )}
            </p>
          </div>
        </div>
      </div>

      <h1>Endereço</h1>
      <div className="box">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Cep:</span>
              <Controller
                control={control}
                name="endereco.cep"
                rules={{ required: 'O CEP é obrigatório' }}
                render={({ field }) => (
                  <InputMask
                    mask="99999-999"
                    className={`form-control ${
                      errors.endereco?.cep ? 'is-invalid' : ''
                    }`}
                    {...field}
                  />
                )}
              />
              {errors.endereco?.cep && (
                <div className="invalid-feedback">
                  {errors.endereco.cep.message}
                </div>
              )}
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Logradouro:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Digite o logradouro..."
                {...register('endereco.logradouro', {})}
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Numero:</span>
              <input
                type="number"
                className="form-control"
                placeholder="Digite o número..."
                {...register('endereco.numero', {})}
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Complemento:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Digite o complemento..."
                {...register('endereco.complemento')}
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Bairro:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Digite o bairro..."
                {...register('endereco.bairro', {})}
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Estado:</span>
              <select
                className="form-control"
                {...register('endereco.estado', {
                  required: 'O estado é obrigatório',
                })}
              >
                {Object.entries(EstadoLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.endereco?.estado && (
                <div className="invalid-feedback">
                  {errors.endereco.estado.message}
                </div>
              )}
            </p>
          </div>
        </div>
      </div>
      <button
        className="btn btn-success"
        onClick={handleSubmit(editExistAdvogado)}
      >
        Editar Advogado
      </button>
    </div>
  );
};

export default EditAdvogado;
