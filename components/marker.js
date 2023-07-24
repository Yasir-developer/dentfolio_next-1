import { func, number, oneOfType, string } from 'prop-types';
import markerPin from '../public/images/filter.png';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Marker = ({ className, lat, lng, markerId, onClick, ...props }) => {
  return (
    // <img
    //   className={className}
    //   src={markerPin}
    //   // eslint-disable-next-line react/no-unknown-property
    //   lat={lat}
    //   // eslint-disable-next-line react/no-unknown-property
    //   lng={lng}
    //   onClick={(e) => (onClick ? onClick(e, { markerId, lat, lng }) : null)}
    //   style={{ cursor: 'pointer', fontSize: 40 }}
    //   alt={markerId}
    //   {...props}
    // />
    <div>
      <FaMapMarkerAlt
        size={25}
        // color={"#62a945"}
        className="text-custom-blue"
        lat={lat}
        // eslint-disable-next-line react/no-unknown-property
        lng={lng}
        onClick={(e) => (onClick ? onClick(e, { markerId, lat, lng }) : null)}
        style={{ cursor: 'pointer', fontSize: 40 }}
        alt={markerId}
        {...props}
      />
    </div>
  );
};

Marker.defaultProps = {};

Marker.propTypes = {
  className: string,
  /**
   * The id of the marker.
   */
  markerId: oneOfType([number, string]).isRequired,
  /**
   * The latitude of the marker.
   */
  lat: number.isRequired,
  /**
   * The longitude of the marker.
   */
  lng: number.isRequired,
  /**
   * The function to call when the marker is clicked.
   */
  onClick: func,
};

export default Marker;
