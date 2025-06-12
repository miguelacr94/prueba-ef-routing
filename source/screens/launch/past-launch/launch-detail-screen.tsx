import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Launch } from 'source/types/launchTypes';

interface ServiceDetailProps {
  route: {
    params: {
      launchData: Launch;
    };
  };
}

const { width } = Dimensions.get('window');

const LaunchDetailScreen: React.FC<ServiceDetailProps> = ({ route }) => {
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
    let backgroundColor = '#6B7280';
    let text = 'Desconocido';

    if (upcoming) {
      backgroundColor = '#3B82F6';
      text = 'Próximo';
    } else if (success === true) {
      backgroundColor = '#10B981';
      text = 'Exitoso';
    } else if (success === false) {
      backgroundColor = '#EF4444';
      text = 'Fallido';
    }

    return (
      <View style={[styles.badge, { backgroundColor }]}>
        <Text style={styles.badgeText}>{text}</Text>
      </View>
    );
  };

  const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
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
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={[styles.infoValue, isHighlight && styles.highlightValue]}>
        {value?.toString() || 'N/A'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>{launch.name}</Text>
            <Text style={styles.flightNumber}>Vuelo #{launch.flight_number}</Text>
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

        {/* Cargas Útiles */}
        {/* {launch.payloads && launch.payloads.length > 0 && (
          <InfoCard title="Cargas Útiles">
            <Text style={styles.arrayText}>
              {launch.payloads.length} carga(s) útil(es)
            </Text>
            {launch.payloads.map((payload, index) => (
              <Text key={index} style={styles.arrayItem}>• {payload}</Text>
            ))}
          </InfoCard>
        )} */}

        {/* Cápsulas */}
        {/* {launch.capsules && launch.capsules.length > 0 && (
          <InfoCard title="Cápsulas">
            <Text style={styles.arrayText}>
              {launch.capsules.length} cápsula(s)
            </Text>
            {launch.capsules.map((capsule, index) => (
              <Text key={index} style={styles.arrayItem}>• {capsule}</Text>
            ))}
          </InfoCard>
        )} */}

        {/* Tripulación */}
        {/* {launch.crew && launch.crew.length > 0 && (
          <InfoCard title="Tripulación">
            <Text style={styles.arrayText}>
              {launch.crew.length} miembro(s) de tripulación
            </Text>
            {launch.crew.map((member, index) => (
              <Text key={index} style={styles.arrayItem}>• {member}</Text>
            ))}
          </InfoCard>
        )} */}

        {/* Naves */}
        {/* {launch.ships && launch.ships.length > 0 && (
          <InfoCard title="Naves">
            <Text style={styles.arrayText}>
              {launch.ships.length} nave(s)
            </Text>
            {launch.ships.map((ship, index) => (
              <Text key={index} style={styles.arrayItem}>• {ship}</Text>
            ))}
          </InfoCard>
        )} */}

        {/* Carenados */}
        <InfoCard title="Carenados">
          <InfoRow label="Reutilizado" value={launch.fairings?.reused ? 'Sí' : 'No'} />
          <InfoRow label="Intento de Recuperación" value={launch.fairings?.recovery_attempt ? 'Sí' : 'No'} />
          <InfoRow label="Recuperado" value={launch.fairings?.recovered ? 'Sí' : 'No'} />
          {launch.fairings?.ships && launch.fairings.ships.length > 0 && (
            <View style={styles.subSection}>
              <Text style={styles.subSectionTitle}>Naves de Recuperación:</Text>
              {launch.fairings.ships.map((ship, index) => (
                <Text key={index} style={styles.arrayItem}>• {ship}</Text>
              ))}
            </View>
          )}
        </InfoCard>

        {/* Fallas */}
        {launch.failures && launch.failures.length > 0 && (
          <InfoCard title="Fallas">
            {launch.failures.map((failure, index) => (
              <View key={index} style={styles.failureContainer}>
                <Text style={styles.failureTitle}>Falla {index + 1}</Text>
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
            <Text style={styles.detailsText}>{launch.details}</Text>
          </InfoCard>
        )}

        {/* Enlaces */}
        <InfoCard title="Enlaces">
          <InfoRow label="Parche de Misión" value={launch.links?.patch?.small ? 'Disponible' : 'No disponible'} />
          <InfoRow label="Reddit Campaign" value={launch.links?.reddit?.campaign ? 'Disponible' : 'No disponible'} />
          <InfoRow label="Reddit Launch" value={launch.links?.reddit?.launch ? 'Disponible' : 'No disponible'} />
          <InfoRow label="Reddit Recovery" value={launch.links?.reddit?.recovery ? 'Disponible' : 'No disponible'} />
          <InfoRow label="Flickr" value={launch.links?.flickr?.small?.length ? `${launch.links.flickr.small.length} imágenes` : 'No disponible'} />
          <InfoRow label="Artículo" value={launch.links?.article ? 'Disponible' : 'No disponible'} />
          <InfoRow label="Wikipedia" value={launch.links?.wikipedia ? 'Disponible' : 'No disponible'} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#1F2937',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  flightNumber: {
    fontSize: 18,
    color: '#9CA3AF',
    marginBottom: 15,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  infoLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
    flex: 1,
    minWidth: 100,
  },
  infoValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '400',
    flex: 2,
    textAlign: 'right',
  },
  highlightValue: {
    fontWeight: '600',
    color: '#3B82F6',
  },
  coreContainer: {
    backgroundColor: '#F9FAFB',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  coreTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  arrayText: {
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '500',
    marginBottom: 8,
  },
  arrayItem: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 10,
    marginBottom: 4,
  },
  subSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  subSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 8,
  },
  failureContainer: {
    backgroundColor: '#FEF2F2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  failureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default LaunchDetailScreen;
