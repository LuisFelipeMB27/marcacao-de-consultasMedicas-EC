import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, ViewStyle } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import theme from '../styles/theme';
import Header from '../components/Header';
import DoctorList from '../components/DoctorList';
import TimeSlotList from '../components/TimeSlotList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApiService } from '../services/authApi';
import { User } from '../types/auth';

type CreateAppointmentScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateAppointment'>;
};

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  specialty: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

// ESTADOS para dados da API
const [doctors, setDoctors] = useState<User[]>([]);
const [loadingDoctors, setLoadingDoctors] = useState(true);

// CARREGAMENTO ao montar componente
useEffect(() => {
  loadDoctors();
}, []);

const loadDoctors = async () => {
  try {
    setLoadingDoctors(true);
    const doctorsData = await authApiService.getAllDoctors();
    setDoctors(doctorsData);
  } catch (error) {
    console.error('Erro ao carregar médicos:', error);
    setError('Erro ao carregar médicos. Tente novamente.');
  } finally {
    setLoadingDoctors(false);
  }
};

// CONVERSÃO de User[] para Doctor[]
const convertUsersToDoctors = (users: User[]): Doctor[] => {
  return users.map(user => ({
    id: user.id,
    name: user.name,
    specialty: user.role === 'doctor' && 'specialty' in user
      ? user.specialty
      : 'Especialidade não informada',
    image: user.image
  }));
};

// USO de dados reais
{loadingDoctors ? (
  <ErrorText>Carregando médicos...</ErrorText>
) : (
  <DoctorList
    doctors={convertUsersToDoctors(doctors)} // Dados reais convertidos
    onSelectDoctor={setSelectedDoctor}
    selectedDoctorId={selectedDoctor?.id}
  />
)}

        {error ? <ErrorText>{error}</ErrorText> : null}

        <Button
          title="Agendar"
          onPress={handleCreateAppointment}
          loading={loading}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          title="Cancelar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.cancelButton}
        />
      </ScrollView>
    </Container>
  );
};

const styles = {
  scrollContent: {
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
  },
  cancelButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
  },
};

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 10px;
  margin-top: 10px;
`;

const ErrorText = styled.Text`
  color: ${theme.colors.error};
  text-align: center;
  margin-bottom: 10px;
`;

export default CreateAppointmentScreen;
