import React from 'react';
import { Text, View, ScrollView, StatusBar } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Launch } from '../../types/launchTypes';

type RootStackParamList = {
  LaunchDetailScreen: { launchData: Launch };
};

interface LaunchDetailProps {
  route: RouteProp<RootStackParamList, 'LaunchDetailScreen'>;
}

const LaunchDetailScreen: React.FC<LaunchDetailProps> = ({ route }) => {
  const { launchData: launch } = route.params;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const StatusBadge = ({ success, upcoming }: { success: boolean | null; upcoming: boolean }) => {
    let backgroundColor = 'bg-gray-500';
    let text = 'Desconocido';

    if (upcoming) {
      backgroundColor = 'bg-blue-500';
      text = 'Próximo';
    } else if (success === true) {
      backgroundColor = 'bg-green-500';
      text = 'Exitoso';
    } else if (success === false) {
      backgroundColor = 'bg-red-500';
      text = 'Fallido';
    }

    return (
      <View className={`${backgroundColor} mt-2 rounded-full px-4 py-2`}>
        <Text className="text-sm font-semibold text-white">{text}</Text>
      </View>
    );
  };

  const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View className="mx-4 mt-4 rounded-xl bg-white p-5 shadow shadow-black/10">
      <Text className="mb-4 border-b-2 border-gray-200 pb-2 text-xl font-bold text-gray-800">
        {title}
      </Text>
      {children}
    </View>
  );

  const InfoRow = ({
    label,
    value,
    isHighlight = false,
  }: {
    label: string;
    value: string | number | null;
    isHighlight?: boolean;
  }) => (
    <View className="mb-3 flex-row flex-wrap items-start justify-between">
      <Text className="min-w-[100px] flex-1 text-base font-medium text-gray-500">{label}:</Text>
      <Text
        className={`flex-2 text-right text-base font-normal text-gray-800 ${
          isHighlight ? 'font-semibold text-blue-500' : ''
        }`}>
        {value?.toString() || 'N/A'}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header */}
        <View className="bg-gray-800 px-5 pb-8 pt-12">
          <View className="items-center">
            <Text className="mb-2 text-center text-2xl font-bold text-white">{launch.name}</Text>
            <Text className="mb-4 text-lg text-gray-400">Vuelo #{launch.flight_number}</Text>
            <StatusBadge success={launch.success} upcoming={launch.upcoming} />
          </View>
        </View>

        {/* Información Principal */}
        <InfoCard title="Información General">
          <InfoRow label="Fecha" value={formatDate(launch.date_utc)} isHighlight />
          <InfoRow label="Fecha Local" value={formatDate(launch.date_local)} />
          <InfoRow label="Precisión de Fecha" value={launch.date_precision} />
          <InfoRow label="Ventana de Lanzamiento" value={`${launch.window} segundos`} />
          <InfoRow label="Por Determinar" value={launch.tbd ? 'Sí' : 'No'} />
          <InfoRow label="Actualización Automática" value={launch.auto_update ? 'Sí' : 'No'} />
        </InfoCard>

        {/* Cohete */}
        <InfoCard title="Cohete">
          <InfoRow label="Nombre" value={launch.rocket?.name} isHighlight />
          <InfoRow label="Tipo" value={launch.rocket?.type} />
          <InfoRow label="Activo" value={launch.rocket?.active ? 'Sí' : 'No'} />
          <InfoRow label="Etapas" value={launch.rocket?.stages} />
          <InfoRow label="Boosters" value={launch.rocket?.boosters} />
          <InfoRow
            label="Costo por Lanzamiento"
            value={
              launch.rocket?.cost_per_launch
                ? `$${launch.rocket.cost_per_launch.toLocaleString()}`
                : 'N/A'
            }
          />
          <InfoRow
            label="Tasa de Éxito"
            value={launch.rocket?.success_rate_pct ? `${launch.rocket.success_rate_pct}%` : 'N/A'}
          />
        </InfoCard>

        {/* Plataforma de Lanzamiento */}
        <InfoCard title="Plataforma de Lanzamiento">
          <InfoRow label="Nombre" value={launch.launchpad?.name} isHighlight />
          <InfoRow label="Nombre Completo" value={launch.launchpad?.full_name} />
          <InfoRow label="Localidad" value={launch.launchpad?.locality} />
          <InfoRow label="Región" value={launch.launchpad?.region} />
          <InfoRow label="Zona Horaria" value={launch.launchpad?.timezone} />
          <InfoRow label="Estado" value={launch.launchpad?.status} />
          <InfoRow label="Intentos de Lanzamiento" value={launch.launchpad?.launch_attempts} />
          <InfoRow label="Lanzamientos Exitosos" value={launch.launchpad?.launch_successes} />
        </InfoCard>

        {/* Carenados */}
        <InfoCard title="Carenados">
          <InfoRow label="Reutilizado" value={launch.fairings?.reused ? 'Sí' : 'No'} />
          <InfoRow
            label="Intento de Recuperación"
            value={launch.fairings?.recovery_attempt ? 'Sí' : 'No'}
          />
          <InfoRow label="Recuperado" value={launch.fairings?.recovered ? 'Sí' : 'No'} />
          {launch.fairings?.ships && launch.fairings.ships.length > 0 && (
            <View className="mt-2 border-t border-gray-200 pt-2">
              <Text className="mb-2 text-sm font-semibold text-gray-600">
                Naves de Recuperación:
              </Text>
              {launch.fairings.ships.map((ship, index) => (
                <Text key={index} className="mb-1 ml-2 text-sm text-gray-500">
                  • {ship}
                </Text>
              ))}
            </View>
          )}
        </InfoCard>

        {/* Fallas */}
        {launch.failures && launch.failures.length > 0 && (
          <InfoCard title="Fallas">
            {launch.failures.map((failure, index) => (
              <View key={index} className="mb-3 rounded border-l-4 border-red-500 bg-red-50 p-4">
                <Text className="mb-2 text-base font-bold text-red-700">Falla {index + 1}</Text>
                <InfoRow label="Tiempo" value={failure.time} />
                <InfoRow label="Altitud" value={failure.altitude} />
                <InfoRow label="Razón" value={failure.reason} />
              </View>
            ))}
          </InfoCard>
        )}

        {/* Prueba de Fuego Estático */}
        <InfoCard title="Prueba de Fuego Estático">
          <InfoRow
            label="Fecha"
            value={launch.static_fire_date_utc ? formatDate(launch.static_fire_date_utc) : 'N/A'}
          />
        </InfoCard>

        {/* Detalles */}
        {launch.details && (
          <InfoCard title="Detalles">
            <Text className="text-justify text-base leading-6 text-gray-600">{launch.details}</Text>
          </InfoCard>
        )}

        {/* Enlaces */}
        <InfoCard title="Enlaces">
          <InfoRow
            label="Parche de Misión"
            value={launch.links?.patch?.small ? 'Disponible' : 'No disponible'}
          />
          <InfoRow
            label="Reddit Campaign"
            value={launch.links?.reddit?.campaign ? 'Disponible' : 'No disponible'}
          />
          <InfoRow
            label="Reddit Launch"
            value={launch.links?.reddit?.launch ? 'Disponible' : 'No disponible'}
          />
          <InfoRow
            label="Reddit Recovery"
            value={launch.links?.reddit?.recovery ? 'Disponible' : 'No disponible'}
          />
          <InfoRow
            label="Flickr"
            value={
              launch.links?.flickr?.small?.length
                ? `${launch.links.flickr.small.length} imágenes`
                : 'No disponible'
            }
          />
          <InfoRow
            label="Artículo"
            value={launch.links?.article ? 'Disponible' : 'No disponible'}
          />
          <InfoRow
            label="Wikipedia"
            value={launch.links?.wikipedia ? 'Disponible' : 'No disponible'}
          />
          <InfoRow label="Video" value={launch.links?.webcast ? 'Disponible' : 'No disponible'} />
          <InfoRow label="YouTube ID" value={launch.links?.youtube_id || 'N/A'} />
        </InfoCard>

        {/* Información Técnica */}
        <InfoCard title="Información Técnica">
          <InfoRow label="ID" value={launch.id} />
          <InfoRow label="NET" value={launch.net ? 'Sí' : 'No'} />
          <InfoRow label="Launch Library ID" value={launch.launch_library_id} />
        </InfoCard>
      </ScrollView>
    </View>
  );
};

export default LaunchDetailScreen;
