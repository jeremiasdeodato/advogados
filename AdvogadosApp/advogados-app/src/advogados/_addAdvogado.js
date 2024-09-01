import React from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { Senioridades, SenioridadeLabels } from '../enums/senioridades.enum';
import { Estados, EstadoLabels } from '../enums/estados.enum';

const initialAdvogadoInfo = {
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
};

function AddAdvogado(props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialAdvogadoInfo,
  });

  const addNewAdvogado = async (data) => {
    data.senioridade = Number(data.senioridade);
    const payload = {
      nome: data.nome,
      dataDeNascimento: data.dataDeNascimento,
      email: data.email,
      senioridade: data.senioridade,
      endereco: {
        logradouro: data.endereco.logradouro,
        bairro: data.endereco.bairro,
        estado: data.endereco.estado,
        numero: data.endereco.numero,
        complemento: data.endereco.complemento,
        cep: data.endereco.cep,
      },
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/Advogados/inserir',
        payload,
      );
      if (response) {
        props.setAdvogadoAdded();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="advogado-view _add-view">
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
              <select className="form-control" {...register('senioridade')}>
                {Object.entries(SenioridadeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
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
                {...register('endereco.logradouro')}
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
                {...register('endereco.numero')}
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
                {...register('endereco.bairro')}
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Estado:</span>
              <select className="form-control" {...register('endereco.estado')}>
                {Object.entries(EstadoLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </p>
          </div>
        </div>
      </div>
      <button
        className="btn btn-success"
        onClick={handleSubmit(addNewAdvogado)}
      >
        Adicionar novo advogado
      </button>
    </div>
  );
}

export default AddAdvogado;
