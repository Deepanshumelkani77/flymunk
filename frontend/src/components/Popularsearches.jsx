import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const NAVY = '#02183D'
const ORANGE = '#FE6101'

// ---------------------------------------------------------------------------
// Domestic (India) flight routes, organised city-wise as supplied.
// Each constant below is a destination list for one origin airport; `r()`
// turns it into "Origin to Destination" strings and drops any self-route.
// ---------------------------------------------------------------------------
const r = (origin, destinations) => destinations.filter((d) => d !== origin).map((d) => `${origin} to ${d}`)

const DELHI_DESTS = ['Agartala','Ahmedabad','Agra','Amritsar','Aurangabad','Ayodhya','Bagdogra','Belagavi','Bengaluru','Bhopal','Bhubaneswar','Chandigarh','Chennai','Coimbatore','Dehradun','Dibrugarh','Dimapur','Dharamshala','Gaya','Goa','Gorakhpur','Guwahati','Gwalior','Hubli','Hyderabad','Imphal','Indore','Itanagar (Hollongi)','Jabalpur','Jaipur','Jammu','Jamnagar','Jodhpur','Jorhat','Kannur','Khajuraho','Kishangarh (Ajmer)','Kochi','Kolkata','Kozhikode','Kullu (Bhuntar)','Leh','Lucknow','Madurai','Mangalore','Mumbai','Mysuru','Nagpur','Nashik','Patna','Pantnagar','Port Blair','Prayagraj','Pune','Raipur','Rajahmundry','Rajkot','Ranchi','Shillong','Shimla','Silchar','Srinagar','Surat','Thiruvananthapuram','Tiruchirappalli','Tirupati','Udaipur','Vadodara','Varanasi','Vijayawada','Visakhapatnam']
const MUMBAI_DESTS = ['Agartala','Ahmedabad','Amritsar','Aurangabad','Ayodhya','Bagdogra','Belagavi','Bengaluru','Bhopal','Bhubaneswar','Chandigarh','Chennai','Coimbatore','Dehradun','Dibrugarh','Goa','Gorakhpur','Guwahati','Hubli','Hyderabad','Imphal','Indore','Jaipur','Jammu','Jodhpur','Kochi','Kolkata','Kozhikode','Leh','Lucknow','Madurai','Mangalore','Mysuru','Nagpur','Nashik','Patna','Port Blair','Prayagraj','Pune','Raipur','Rajkot','Ranchi','Shillong','Silchar','Srinagar','Surat','Thiruvananthapuram','Tiruchirappalli','Tirupati','Udaipur','Vadodara','Varanasi','Vijayawada','Visakhapatnam','Jabalpur','Gaya','Kandla','Jamnagar','Bhuj','Porbandar','Diu','Kullu (Bhuntar)','Dharamshala','Shimla','Pantnagar','Kannur','Salem','Tuticorin']
const BENGALURU_DESTS = ['Delhi','Mumbai','Chennai','Hyderabad','Kolkata','Pune','Ahmedabad','Goa','Kochi','Thiruvananthapuram','Kozhikode','Kannur','Mangalore','Mysuru','Hubli','Belagavi','Coimbatore','Madurai','Tiruchirappalli','Salem','Tuticorin','Tirupati','Vijayawada','Visakhapatnam','Rajahmundry','Kadapa','Kurnool','Bhubaneswar','Ranchi','Patna','Varanasi','Prayagraj','Lucknow','Kanpur','Jaipur','Udaipur','Jodhpur','Chandigarh','Amritsar','Jammu','Srinagar','Leh','Guwahati','Agartala','Imphal','Shillong','Aizawl','Dimapur','Dibrugarh','Silchar','Bagdogra','Raipur','Nagpur','Indore','Bhopal','Surat','Vadodara','Rajkot','Jamnagar','Bhuj','Aurangabad','Nashik','Port Blair','Agra','Gaya','Jabalpur','Dehradun','Pantnagar','Dharamshala','Shimla','Kullu','Jaisalmer','Durgapur']
const HYDERABAD_DESTS = ['Delhi','Mumbai','Bengaluru','Chennai','Kolkata','Pune','Ahmedabad','Goa','Kochi','Kozhikode','Kannur','Mangalore','Coimbatore','Madurai','Tiruchirappalli','Thoothukudi','Vijayawada','Rajahmundry','Visakhapatnam','Tirupati','Kadapa','Kurnool','Hubli','Belagavi','Mysuru','Nagpur','Indore','Bhopal','Jabalpur','Raipur','Bhubaneswar','Ranchi','Patna','Varanasi','Prayagraj','Lucknow','Kanpur','Dehradun','Chandigarh','Amritsar','Srinagar','Jammu','Leh','Jaipur','Jodhpur','Udaipur','Surat','Vadodara','Rajkot','Bhuj','Jamnagar','Port Blair','Guwahati','Agartala','Imphal','Shillong','Aizawl','Dimapur','Dibrugarh','Jorhat','Silchar','Bagdogra','Durgapur','Agra','Gaya','Khajuraho','Jaisalmer','Kullu','Shimla','Dharamshala','Pantnagar','Nashik','Aurangabad']
const CHENNAI_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Kolkata','Pune','Ahmedabad','Goa','Kochi','Jaipur','Lucknow','Srinagar','Chandigarh','Guwahati','Bhubaneswar','Indore','Coimbatore','Visakhapatnam','Thiruvananthapuram','Nagpur','Mangaluru','Kozhikode','Madurai','Tiruchirappalli','Vijayawada','Vadodara','Surat','Patna','Ranchi','Varanasi','Jammu','Amritsar','Dehradun','Udaipur','Jodhpur','Raipur','Tirupati','Kannur','Dibrugarh','Silchar','Imphal','Tuticorin','Agartala','Jorhat','Dimapur','Shillong','Leh','Hubballi','Belagavi','Mysuru','Rajkot','Bhuj','Bhavnagar','Rajahmundry','Gaya','Gwalior','Jabalpur','Aurangabad','Nashik','Kolhapur','Bhopal','Gorakhpur','Prayagraj','Kanpur','Bareilly','Agra','Ayodhya','Pantnagar','Shimla','Kullu','Bilaspur','Dhanbad','Tezpur','Itanagar','Lilabari','Aizawl','Port Blair','Agatti','Diu','Kandla','Jamnagar','Bikaner','Khajuraho','Kadapa']
const PUNE_DESTS = ['Ahmedabad','Amritsar','Bengaluru','Bhopal','Bhubaneswar','Chandigarh','Chennai','Coimbatore','Dehradun','Delhi','Dabolim (Goa)','North Goa (Mopa)','Guwahati','Hubballi','Hyderabad','Indore','Jaipur','Jalgaon','Jodhpur','Kochi','Kolkata','Lucknow','Mangaluru','Nagpur','Patna','Raipur','Rajkot','Ranchi','Surat','Thiruvananthapuram','Tiruchirappalli','Vadodara','Varanasi','Vijayawada','Visakhapatnam','Kishangarh','Sindhudurg']
// Shared destination set used by Ahmedabad, Goa, Kochi, Jaipur, Kolkata & Lucknow in the source list
const COMMON_METRO_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Chennai','Kolkata','Pune','Ahmedabad','Goa','Kochi','Jaipur','Lucknow','Srinagar','Chandigarh','Guwahati','Bhubaneswar','Indore','Coimbatore','Visakhapatnam','Thiruvananthapuram','Nagpur','Mangaluru','Kozhikode','Madurai','Tiruchirappalli','Vijayawada','Vadodara','Surat','Patna','Ranchi','Varanasi','Jammu','Amritsar','Dehradun','Udaipur','Jodhpur','Raipur','Tirupati','Kannur','Dibrugarh','Silchar','Imphal','Agartala','Jorhat','Dimapur','Shillong','Leh','Hubballi','Belagavi','Mysuru','Rajkot','Bhuj','Bhavnagar','Rajahmundry','Gaya','Gwalior','Jabalpur','Aurangabad','Nashik','Kolhapur','Bhopal','Gorakhpur','Prayagraj','Kanpur','Bareilly','Agra','Ayodhya','Pantnagar','Shimla','Kullu','Bilaspur','Dhanbad','Tezpur','Itanagar','Lilabari','Aizawl','Port Blair','Agatti','Diu','Kandla','Jamnagar','Bikaner','Khajuraho','Kadapa','Kalaburagi','Tuticorin']
const GUWAHATI_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Chennai','Kolkata','Ahmedabad','Kochi','Pune','Goa','Lucknow','Jaipur','Chandigarh','Bhubaneswar','Srinagar','Varanasi','Indore','Nagpur','Patna','Coimbatore','Visakhapatnam','Tiruchirappalli','Madurai','Mangalore','Kozhikode','Vijayawada','Tirupati','Ranchi','Raipur','Dehradun','Jammu','Amritsar','Surat','Vadodara','Rajkot','Bhavnagar','Jamnagar','Bhuj','Jodhpur','Udaipur','Jaisalmer','Bikaner','Aurangabad','Nashik','Kolhapur','Belagavi','Hubballi','Mysuru','Dharamshala','Shimla','Kullu','Leh','Gwalior','Jabalpur','Khajuraho','Agra','Kanpur','Prayagraj','Gorakhpur','Bareilly','Ayodhya','Pantnagar','Bagdogra','Dibrugarh','Jorhat','Tezpur','Lilabari','Dimapur','Imphal','Aizawl','Agartala','Shillong','Itanagar','Pasighat','Tezu','Port Blair','Diu','Kandla','Keshod','Porbandar','Salem','Tuticorin','Puducherry','Kadapa','Kurnool','Ballari','Kalaburagi','Bidar','Shirdi','Sindhudurg','Jalgaon','Nanded','Akola','Rajahmundry','Solapur','Gaya','Darbhanga','Purnea','Rourkela','Jharsuguda','Jeypore','Cooch Behar']
const CHANDIGARH_DESTS = ['Ahmedabad','Bengaluru','Chennai','Delhi','Goa','Hyderabad','Jammu','Kolkata','Varanasi','Dehradun','Tirupati','Dharamshala','Leh','Lucknow','Mumbai','Pune','Srinagar','Kochi','Jaipur','Patna','Indore']
const BHUBANESWAR_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Chennai','Kolkata','Ahmedabad','Kochi','Pune','Goa','Lucknow','Jaipur','Guwahati','Chandigarh','Srinagar','Varanasi','Indore','Nagpur','Patna','Coimbatore','Visakhapatnam','Tiruchirappalli','Madurai','Mangalore','Kozhikode','Vijayawada','Tirupati','Ranchi','Raipur','Dehradun','Jammu','Amritsar','Surat','Vadodara','Rajkot','Bhavnagar','Jamnagar','Bhuj','Jodhpur','Udaipur','Jaisalmer','Bikaner','Aurangabad','Nashik','Kolhapur','Belagavi','Hubballi','Mysuru','Dharamshala','Shimla','Kullu','Leh','Gwalior','Jabalpur','Khajuraho','Agra','Kanpur','Prayagraj','Gorakhpur','Bareilly','Ayodhya','Pantnagar','Siliguri','Dibrugarh','Jorhat','Tezpur','Lilabari','Dimapur','Imphal','Aizawl','Agartala','Shillong','Itanagar','Pasighat','Tezu','Port Blair','Diu','Kandla','Keshod','Porbandar','Salem','Tuticorin','Puducherry','Cuddapah','Kurnool','Bellary','Kalaburagi','Bidar','Shirdi','Sindhudurg','Jalgaon','Nanded','Akola','Solapur','Gaya','Darbhanga','Purnea','Rourkela','Jharsuguda','Jeypore','Cooch Behar','Pakyong']
const SRINAGAR_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Chennai','Kolkata','Ahmedabad','Pune','Jammu','Leh','Chandigarh','Amritsar','Jaipur','Lucknow','Indore','Nagpur','Patna','Varanasi','Guwahati','Dehradun','Dharamshala','Goa','Kochi','Kozhikode','Mangalore','Visakhapatnam','Bhubaneswar','Raipur','Ranchi','Surat','Vadodara','Rajkot','Udaipur','Jodhpur','Agra','Prayagraj','Gorakhpur','Ayodhya','Kanpur','Tirupati','Vijayawada','Coimbatore','Madurai','Tiruchirappalli','Port Blair']
const VARANASI_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Kolkata','Chennai','Ahmedabad','Pune','Bhubaneswar','Lucknow','Patna','Jaipur','Durgapur','Khajuraho','Vijayawada']
const INDORE_DESTS = ['Ahmedabad','Bengaluru','Birsi','Delhi','Hyderabad','Jalgaon','Mumbai','Nagpur','Pune','Raipur','Rewa','Surat','Chennai','Goa','Jaipur','Kolkata','Lucknow','Patna','Varanasi']
const NAGPUR_DESTS = ['Ahmedabad','Bengaluru','Delhi','Goa (Mopa)','Hyderabad','Indore','Kishangarh (Ajmer)','Kolkata','Mumbai','Nanded','Navi Mumbai','Pune']
const PATNA_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Kolkata','Chennai','Ahmedabad','Pune','Lucknow','Bhubaneswar','Chandigarh','Ranchi','Navi Mumbai']
const COIMBATORE_DESTS = ['Bengaluru','Chennai','Delhi','Goa','Hyderabad','Mumbai','Navi Mumbai','Pune','Ahmedabad']
const VISAKHAPATNAM_DESTS = ['Delhi','Hyderabad','Bengaluru','Chennai','Mumbai','Kolkata','Vijayawada','Tirupati','Bhubaneswar','Raipur','Jeypore','Port Blair']
const TIRUCHIRAPPALLI_DESTS = ['Bengaluru','Chennai','Delhi','Hyderabad','Kochi','Mumbai']
const MADURAI_DESTS = ['Bengaluru','Chennai','Hyderabad','Mumbai','Delhi']
const MANGALORE_DESTS = ['Bengaluru','Chennai','Delhi','Hyderabad','Mumbai','Thiruvananthapuram']
const KOZHIKODE_DESTS = ['Bengaluru','Chennai','Hyderabad','Kochi','Mumbai','Delhi']
const VIJAYAWADA_DESTS = ['Bengaluru','Chennai','Delhi','Hyderabad','Kadapa','Kurnool','Mumbai','Tirupati','Varanasi','Visakhapatnam']
const TIRUPATI_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Chennai','Vijayawada','Visakhapatnam','Coimbatore']
const RANCHI_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Kolkata','Chennai','Patna','Bhubaneswar']
const RAIPUR_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Kolkata','Chennai','Pune','Indore','Nagpur','Visakhapatnam','Jaipur']
const DEHRADUN_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Chennai','Ahmedabad','Jaipur','Lucknow','Pune']
const JAMMU_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Srinagar','Leh']
const AMRITSAR_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Srinagar','Pune']
const SURAT_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Chennai','Jaipur','Indore','Bhubaneswar','Goa','Pune']
const VADODARA_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Chennai','Kolkata','Ahmedabad','Pune','Goa','Jaipur','Lucknow','Indore']
const RAJKOT_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Ahmedabad','Pune']
const BHAVNAGAR_DESTS = ['Mumbai']
const JAMNAGAR_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Ahmedabad']
const BHUJ_DESTS = ['Mumbai','Delhi','Ahmedabad']
const JODHPUR_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Jaipur','Ahmedabad']
const BIKANER_DESTS = ['Delhi']
const UDAIPUR_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Chennai','Kolkata','Ahmedabad','Jaipur']
const JAISALMER_DESTS = ['Delhi','Mumbai','Bengaluru','Jaipur']
const AURANGABAD_DESTS = ['Delhi','Mumbai','Hyderabad','Bengaluru']
const NASHIK_DESTS = ['Delhi','Hyderabad']
const KOLHAPUR_DESTS = ['Bengaluru','Hyderabad']
const BELAGAVI_DESTS = ['Bengaluru','Mumbai','Hyderabad','Ahmedabad','Jodhpur']
const HUBBALLI_DESTS = ['Bengaluru','Mumbai','Hyderabad','Chennai','Kochi','Ahmedabad','Delhi','Pune']
const MYSURU_DESTS = ['Bengaluru','Chennai','Hyderabad','Goa','Kochi','Mangaluru']
const DHARAMSHALA_DESTS = ['Delhi','Chandigarh','Shimla']
const SHIMLA_DESTS = ['Delhi','Dharamshala']
const KULLU_DESTS = ['Delhi']
const LEH_DESTS = ['Delhi','Mumbai','Bengaluru','Srinagar','Jammu','Chandigarh']
const GWALIOR_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Indore']
const JABALPUR_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Indore','Pune']
const KHAJURAHO_DESTS = ['Delhi','Varanasi']
const AGRA_DESTS = ['Bengaluru','Mumbai']
const KANPUR_DESTS = ['Prayagraj','Gorakhpur','Ayodhya','Bengaluru','Mumbai']
const PRAYAGRAJ_DESTS = ['Kanpur','Delhi','Mumbai','Bengaluru','Hyderabad','Pune','Bhopal','Lucknow','Raipur','Dehradun','Bilaspur']
const GORAKHPUR_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Kolkata','Lucknow','Prayagraj','Ayodhya']
const BAREILLY_DESTS = ['Delhi','Mumbai','Bengaluru']
const AYODHYA_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Ahmedabad','Chennai','Kolkata']
const PANTNAGAR_DESTS = ['Delhi','Jaipur','Dehradun']
const SILIGURI_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Chennai','Kolkata','Guwahati','Pune']
const DIBRUGARH_DESTS = ['Delhi','Kolkata','Guwahati','Dimapur','Lilabari','Pasighat']
const JORHAT_DESTS = ['Delhi','Kolkata','Guwahati']
const TEZPUR_DESTS = ['Kolkata']
const LILABARI_DESTS = ['Guwahati','Dibrugarh']
const DIMAPUR_DESTS = ['Delhi','Kolkata','Guwahati','Dibrugarh']
const IMPHAL_DESTS = ['Delhi','Kolkata','Guwahati','Bengaluru','Silchar','Agartala','Aizawl']
const AIZAWL_DESTS = ['Delhi','Kolkata','Guwahati','Imphal','Agartala']
const AGARTALA_DESTS = ['Delhi','Kolkata','Guwahati','Bengaluru','Chennai','Imphal','Aizawl']
const SHILLONG_DESTS = ['Delhi','Kolkata','Guwahati']
const ITANAGAR_DESTS = ['Delhi','Kolkata','Guwahati']
const PASIGHAT_DESTS = ['Guwahati']
const TEZU_DESTS = ['Guwahati']
const PORT_BLAIR_DESTS = ['Delhi','Mumbai','Bengaluru','Chennai','Kolkata','Hyderabad','Visakhapatnam']
const DIU_DESTS = ['Mumbai','Ahmedabad','Surat']
const KANDLA_DESTS = ['Mumbai','Ahmedabad']
const PORBANDAR_DESTS = ['Mumbai','Ahmedabad']
const SALEM_DESTS = ['Chennai']
const TUTICORIN_DESTS = ['Chennai']
const PUDUCHERRY_DESTS = ['Bengaluru','Hyderabad']
const CUDDAPAH_DESTS = ['Bengaluru']
const RAJAHMUNDRY_DESTS = ['Bengaluru','Hyderabad','Chennai']
const KURNOOL_DESTS = ['Bengaluru']
const BELLARY_DESTS = ['Bengaluru']
const KALABURAGI_DESTS = ['Bengaluru','Hyderabad']
const BIDAR_DESTS = ['Bengaluru']
const SHIRDI_DESTS = ['Delhi','Hyderabad','Chennai','Bengaluru']
const SINDHUDURG_DESTS = ['Mumbai']
const JALGAON_DESTS = ['Mumbai']
const NANDED_DESTS = ['Mumbai']
const AKOLA_DESTS = ['Mumbai']
const GAYA_DESTS = ['Delhi','Kolkata','Varanasi']
const SOLAPUR_DESTS = ['Mumbai']
const DARBHANGA_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Kolkata']
const PURNEA_DESTS = ['Delhi','Kolkata']
const ROURKELA_DESTS = ['Bhubaneswar','Kolkata']
const JHARSUGUDA_DESTS = ['Delhi','Mumbai','Bengaluru','Hyderabad','Kolkata']
const JEYPORE_DESTS = ['Bhubaneswar']
const COOCH_BEHAR_DESTS = ['Kolkata']
const PAKYONG_DESTS = ['Delhi','Kolkata','Guwahati']

const DOMESTIC_ROUTE_GROUPS = [
  { city: 'Delhi', items: r('Delhi', DELHI_DESTS) },
  { city: 'Mumbai', items: r('Mumbai', MUMBAI_DESTS) },
  { city: 'Bengaluru', items: r('Bengaluru', BENGALURU_DESTS) },
  { city: 'Hyderabad', items: r('Hyderabad', HYDERABAD_DESTS) },
  { city: 'Chennai', items: r('Chennai', CHENNAI_DESTS) },
  { city: 'Pune', items: r('Pune', PUNE_DESTS) },
  { city: 'Ahmedabad', items: r('Ahmedabad', COMMON_METRO_DESTS) },
  { city: 'Goa', items: r('Goa', COMMON_METRO_DESTS) },
  { city: 'Kochi', items: r('Kochi', COMMON_METRO_DESTS) },
  { city: 'Jaipur', items: r('Jaipur', COMMON_METRO_DESTS) },
  { city: 'Kolkata', items: r('Kolkata', COMMON_METRO_DESTS) },
  { city: 'Lucknow', items: r('Lucknow', COMMON_METRO_DESTS) },
  { city: 'Guwahati', items: r('Guwahati', GUWAHATI_DESTS) },
  { city: 'Chandigarh', items: r('Chandigarh', CHANDIGARH_DESTS) },
  { city: 'Bhubaneswar', items: r('Bhubaneswar', BHUBANESWAR_DESTS) },
  { city: 'Srinagar', items: r('Srinagar', SRINAGAR_DESTS) },
  { city: 'Varanasi', items: r('Varanasi', VARANASI_DESTS) },
  { city: 'Indore', items: r('Indore', INDORE_DESTS) },
  { city: 'Nagpur', items: r('Nagpur', NAGPUR_DESTS) },
  { city: 'Patna', items: r('Patna', PATNA_DESTS) },
  { city: 'Coimbatore', items: r('Coimbatore', COIMBATORE_DESTS) },
  { city: 'Visakhapatnam', items: r('Visakhapatnam', VISAKHAPATNAM_DESTS) },
  { city: 'Tiruchirappalli', items: r('Tiruchirappalli', TIRUCHIRAPPALLI_DESTS) },
  { city: 'Madurai', items: r('Madurai', MADURAI_DESTS) },
  { city: 'Mangalore', items: r('Mangalore', MANGALORE_DESTS) },
  { city: 'Kozhikode', items: r('Kozhikode', KOZHIKODE_DESTS) },
  { city: 'Vijayawada', items: r('Vijayawada', VIJAYAWADA_DESTS) },
  { city: 'Tirupati', items: r('Tirupati', TIRUPATI_DESTS) },
  { city: 'Ranchi', items: r('Ranchi', RANCHI_DESTS) },
  { city: 'Raipur', items: r('Raipur', RAIPUR_DESTS) },
  { city: 'Dehradun', items: r('Dehradun', DEHRADUN_DESTS) },
  { city: 'Jammu', items: r('Jammu', JAMMU_DESTS) },
  { city: 'Amritsar', items: r('Amritsar', AMRITSAR_DESTS) },
  { city: 'Surat', items: r('Surat', SURAT_DESTS) },
  { city: 'Vadodara', items: r('Vadodara', VADODARA_DESTS) },
  { city: 'Rajkot', items: r('Rajkot', RAJKOT_DESTS) },
  { city: 'Bhavnagar', items: r('Bhavnagar', BHAVNAGAR_DESTS) },
  { city: 'Jamnagar', items: r('Jamnagar', JAMNAGAR_DESTS) },
  { city: 'Bhuj', items: r('Bhuj', BHUJ_DESTS) },
  { city: 'Jodhpur', items: r('Jodhpur', JODHPUR_DESTS) },
  { city: 'Bikaner', items: r('Bikaner', BIKANER_DESTS) },
  { city: 'Udaipur', items: r('Udaipur', UDAIPUR_DESTS) },
  { city: 'Jaisalmer', items: r('Jaisalmer', JAISALMER_DESTS) },
  { city: 'Aurangabad', items: r('Aurangabad', AURANGABAD_DESTS) },
  { city: 'Nashik', items: r('Nashik', NASHIK_DESTS) },
  { city: 'Kolhapur', items: r('Kolhapur', KOLHAPUR_DESTS) },
  { city: 'Belagavi', items: r('Belagavi', BELAGAVI_DESTS) },
  { city: 'Hubballi', items: r('Hubballi', HUBBALLI_DESTS) },
  { city: 'Mysuru', items: r('Mysuru', MYSURU_DESTS) },
  { city: 'Dharamshala', items: r('Dharamshala', DHARAMSHALA_DESTS) },
  { city: 'Shimla', items: r('Shimla', SHIMLA_DESTS) },
  { city: 'Kullu (Bhuntar)', items: r('Kullu (Bhuntar)', KULLU_DESTS) },
  { city: 'Leh', items: r('Leh', LEH_DESTS) },
  { city: 'Gwalior', items: r('Gwalior', GWALIOR_DESTS) },
  { city: 'Jabalpur', items: r('Jabalpur', JABALPUR_DESTS) },
  { city: 'Khajuraho', items: r('Khajuraho', KHAJURAHO_DESTS) },
  { city: 'Agra', items: r('Agra', AGRA_DESTS) },
  { city: 'Kanpur', items: r('Kanpur', KANPUR_DESTS) },
  { city: 'Prayagraj', items: r('Prayagraj', PRAYAGRAJ_DESTS) },
  { city: 'Gorakhpur', items: r('Gorakhpur', GORAKHPUR_DESTS) },
  { city: 'Bareilly', items: r('Bareilly', BAREILLY_DESTS) },
  { city: 'Ayodhya', items: r('Ayodhya', AYODHYA_DESTS) },
  { city: 'Pantnagar', items: r('Pantnagar', PANTNAGAR_DESTS) },
  { city: 'Siliguri (Bagdogra)', items: r('Siliguri (Bagdogra)', SILIGURI_DESTS) },
  { city: 'Dibrugarh', items: r('Dibrugarh', DIBRUGARH_DESTS) },
  { city: 'Jorhat', items: r('Jorhat', JORHAT_DESTS) },
  { city: 'Tezpur', items: r('Tezpur', TEZPUR_DESTS) },
  { city: 'Lilabari', items: r('Lilabari', LILABARI_DESTS) },
  { city: 'Dimapur', items: r('Dimapur', DIMAPUR_DESTS) },
  { city: 'Imphal', items: r('Imphal', IMPHAL_DESTS) },
  { city: 'Aizawl', items: r('Aizawl', AIZAWL_DESTS) },
  { city: 'Agartala', items: r('Agartala', AGARTALA_DESTS) },
  { city: 'Shillong', items: r('Shillong', SHILLONG_DESTS) },
  { city: 'Itanagar (Hollongi)', items: r('Itanagar (Hollongi)', ITANAGAR_DESTS) },
  { city: 'Pasighat', items: r('Pasighat', PASIGHAT_DESTS) },
  { city: 'Tezu', items: r('Tezu', TEZU_DESTS) },
  { city: 'Port Blair', items: r('Port Blair', PORT_BLAIR_DESTS) },
  { city: 'Diu', items: r('Diu', DIU_DESTS) },
  { city: 'Kandla', items: [...r('Kandla', KANDLA_DESTS), 'Keshod to Mumbai'] },
  { city: 'Porbandar', items: r('Porbandar', PORBANDAR_DESTS) },
  { city: 'Salem', items: r('Salem', SALEM_DESTS) },
  { city: 'Tuticorin', items: r('Tuticorin', TUTICORIN_DESTS) },
  { city: 'Puducherry', items: r('Puducherry', PUDUCHERRY_DESTS) },
  { city: 'Cuddapah', items: r('Cuddapah', CUDDAPAH_DESTS) },
  { city: 'Rajahmundry', items: r('Rajahmundry', RAJAHMUNDRY_DESTS) },
  { city: 'Kurnool', items: r('Kurnool', KURNOOL_DESTS) },
  { city: 'Bellary', items: r('Bellary', BELLARY_DESTS) },
  { city: 'Kalaburagi', items: r('Kalaburagi', KALABURAGI_DESTS) },
  { city: 'Bidar', items: r('Bidar', BIDAR_DESTS) },
  { city: 'Shirdi', items: r('Shirdi', SHIRDI_DESTS) },
  { city: 'Sindhudurg', items: r('Sindhudurg', SINDHUDURG_DESTS) },
  { city: 'Jalgaon', items: r('Jalgaon', JALGAON_DESTS) },
  { city: 'Nanded', items: r('Nanded', NANDED_DESTS) },
  { city: 'Akola', items: r('Akola', AKOLA_DESTS) },
  { city: 'Gaya', items: r('Gaya', GAYA_DESTS) },
  { city: 'Solapur', items: r('Solapur', SOLAPUR_DESTS) },
  { city: 'Darbhanga', items: r('Darbhanga', DARBHANGA_DESTS) },
  { city: 'Purnea', items: r('Purnea', PURNEA_DESTS) },
  { city: 'Rourkela', items: r('Rourkela', ROURKELA_DESTS) },
  { city: 'Jharsuguda', items: r('Jharsuguda', JHARSUGUDA_DESTS) },
  { city: 'Jeypore', items: r('Jeypore', JEYPORE_DESTS) },
  { city: 'Cooch Behar', items: r('Cooch Behar', COOCH_BEHAR_DESTS) },
  { city: 'Pakyong', items: r('Pakyong', PAKYONG_DESTS) },
].filter((g) => g.items.length > 0)

// Each category mirrors the structure of a real OTA "popular searches" block:
// a short bold title, followed by a pipe-separated set of internal links.
// Swap the `items` arrays for your own live city/hotel/package data —
// the layout and collapse behaviour stay the same.
const CATEGORIES = [
  {
    title: 'Domestic Flight Routes (City-wise)',
    groups: DOMESTIC_ROUTE_GROUPS,
  },
  {
    title: 'Popular Flight Routes',
    items: [
      'New York to London', 'London to Paris', 'Dubai to London', 'New York to Paris',
      'Delhi to Dubai', 'Singapore to Bangkok', 'Los Angeles to Tokyo', 'Dubai to Bangkok',
      'London to New York', 'Toronto to London', 'Sydney to Singapore', 'Dubai to New York',
      'Paris to Rome', 'London to Dubai', 'Singapore to Sydney', 'New York to Dubai',
      'Delhi to Singapore', 'London to Amsterdam', 'Dubai to Istanbul', 'Bangkok to Tokyo',
      'Paris to Barcelona', 'London to Rome', 'Dubai to Doha', 'Singapore to Hong Kong',
      'Mumbai to Dubai', 'Mumbai to London', 'Delhi to New York', 'Delhi to London',
      'Chicago to London', 'Miami to Madrid', 'San Francisco to Tokyo', 'Vancouver to Hong Kong',
      'Toronto to Dubai', 'Sydney to Los Angeles', 'Auckland to Sydney', 'Seoul to Tokyo',
      'Shanghai to Singapore', 'Hong Kong to Bangkok', 'Kuala Lumpur to Singapore',
      'Johannesburg to London', 'Cairo to Dubai', 'Istanbul to Paris', 'Frankfurt to New York',
      'Amsterdam to New York', 'Barcelona to Rome', 'Doha to London', 'Doha to Bangkok',
      'Bali to Singapore', 'Melbourne to Bali', 'Perth to Singapore',
    ],
  },
  {
    title: 'Indian International Airport Routes',
    items: [
      'Delhi to Frankfurt', 'Delhi to Toronto', 'Delhi to Sydney', 'Delhi to Kathmandu',
      'Delhi to Muscat', 'Delhi to Riyadh', 'Delhi to Jeddah', 'Delhi to Kuwait',
      'Delhi to Bahrain', 'Delhi to Male', 'Delhi to Colombo', 'Delhi to Bangkok',
      'Delhi to Kuala Lumpur', 'Delhi to Amsterdam', 'Delhi to Paris', 'Delhi to Hong Kong',
      'Delhi to Doha', 'Delhi to Abu Dhabi', 'Mumbai to Singapore', 'Mumbai to Bangkok',
      'Mumbai to Doha', 'Mumbai to Abu Dhabi', 'Mumbai to Muscat', 'Mumbai to Kuwait',
      'Mumbai to Riyadh', 'Mumbai to Jeddah', 'Mumbai to Frankfurt', 'Mumbai to Paris',
      'Mumbai to New York', 'Mumbai to Toronto', 'Mumbai to Hong Kong', 'Mumbai to Kuala Lumpur',
      'Bengaluru to Dubai', 'Bengaluru to Singapore', 'Bengaluru to London', 'Bengaluru to Bangkok',
      'Bengaluru to Doha', 'Bengaluru to Abu Dhabi', 'Bengaluru to Kuala Lumpur', 'Bengaluru to Hong Kong',
      'Chennai to Singapore', 'Chennai to Dubai', 'Chennai to Kuala Lumpur', 'Chennai to Colombo',
      'Chennai to Doha', 'Chennai to Hong Kong', 'Hyderabad to Dubai', 'Hyderabad to Singapore',
      'Hyderabad to Doha', 'Hyderabad to Bangkok', 'Kolkata to Dubai', 'Kolkata to Bangkok',
      'Kolkata to Singapore', 'Kolkata to Hong Kong', 'Kochi to Dubai', 'Kochi to Doha',
      'Kochi to Abu Dhabi', 'Kochi to Muscat', 'Ahmedabad to Dubai', 'Ahmedabad to London',
      'Goa to Dubai', 'Goa to London', 'Pune to Dubai', 'Pune to Singapore',
      'Thiruvananthapuram to Dubai', 'Thiruvananthapuram to Doha', 'Amritsar to London',
      'Amritsar to Toronto', 'Lucknow to Dubai', 'Jaipur to Dubai', 'Nagpur to Dubai',
      'Chandigarh to Dubai', 'Guwahati to Bangkok', 'Varanasi to Colombo',
      'Calicut to Dubai', 'Mangalore to Dubai', 'Coimbatore to Dubai', 'Tiruchirappalli to Dubai',
      'Visakhapatnam to Dubai', 'Bhubaneswar to Dubai',
    ],
  },
  {
    title: 'China & Hong Kong Airport Routes',
    items: [
      'Delhi to Beijing', 'Delhi to Shanghai', 'Delhi to Guangzhou', 'Mumbai to Shanghai',
      'Mumbai to Guangzhou', 'Bengaluru to Guangzhou', 'Kolkata to Guangzhou', 'Chennai to Guangzhou',
      'Beijing to New York', 'Beijing to London', 'Beijing to Bangkok', 'Beijing to Singapore',
      'Beijing to Tokyo', 'Beijing to Dubai', 'Shanghai to New York', 'Shanghai to London',
      'Shanghai to Tokyo', 'Shanghai to Dubai', 'Shanghai to Bangkok', 'Guangzhou to Bangkok',
      'Guangzhou to Singapore', 'Guangzhou to Dubai', 'Shenzhen to Singapore', 'Shenzhen to Bangkok',
      'Chengdu to Bangkok', 'Chengdu to Singapore', 'Xian to Bangkok', 'Hangzhou to Singapore',
      'Kunming to Bangkok', 'Hong Kong to Singapore', 'Hong Kong to London', 'Hong Kong to New York',
      'Hong Kong to Tokyo', 'Hong Kong to Dubai', 'Hong Kong to Sydney', 'Hong Kong to Delhi',
      'Hong Kong to Mumbai', 'Hong Kong to Kuala Lumpur', 'Hong Kong to Doha',
    ],
  },
  {
    title: 'Hotels By Destination',
    items: [
      'Paris', 'London', 'Dubai', 'New York', 'Singapore', 'Bangkok', 'Rome', 'Barcelona',
      'Bali', 'Tokyo', 'Istanbul', 'Amsterdam', 'Sydney', 'Hong Kong', 'Los Angeles',
      'Maldives', 'Phuket', 'Kuala Lumpur', 'Cape Town', 'Toronto', 'Vienna', 'Prague',
      'Zurich', 'Doha', 'Abu Dhabi', 'Seoul', 'Santorini', 'Venice', 'Miami', 'Las Vegas',
      'San Francisco', 'Chicago', 'Vancouver', 'Berlin', 'Madrid', 'Lisbon', 'Milan',
      'Florence', 'Athens', 'Marrakech', 'Cairo', 'Auckland', 'Melbourne', 'Brisbane',
      'Chiang Mai', 'Ho Chi Minh City', 'Hanoi', 'Bora Bora', 'Mauritius', 'Seychelles',
    ].map((c) => `Hotels in ${c}`),
  },
  {
    title: 'Explore By Country',
    items: [
      'United States', 'United Kingdom', 'United Arab Emirates', 'France', 'Italy', 'Spain',
      'Thailand', 'Singapore', 'Australia', 'Japan', 'Turkey', 'Netherlands', 'Switzerland',
      'Germany', 'Malaysia', 'Indonesia', 'Maldives', 'South Africa', 'Canada', 'Greece',
      'Egypt', 'Qatar', 'Saudi Arabia', 'New Zealand', 'Vietnam', 'Portugal', 'Austria',
      'Ireland', 'Sri Lanka', 'Mauritius', 'Seychelles', 'Morocco', 'Kenya', 'Jordan',
      'Oman', 'Bahrain', 'Kuwait', 'South Korea', 'China', 'Brazil',
    ].map((c) => `Flights to ${c}`),
  },
  {
    title: 'Luxury Hotels Worldwide',
    items: [
      'Burj Al Arab Dubai', 'The Ritz Paris', 'The Savoy London', 'Marina Bay Sands Singapore',
      'Atlantis The Palm Dubai', 'Four Seasons George V Paris', 'The Peninsula Hong Kong',
      'Aman Tokyo', 'Raffles Singapore', 'The Plaza New York', 'Burj Khalifa Suites Dubai',
      "One&Only Reethi Rah Maldives", 'The Dorchester London', 'Hotel de Paris Monte-Carlo',
      'Emirates Palace Abu Dhabi', 'The St. Regis Bali Resort', 'Jumeirah Beach Hotel Dubai',
      'The Ritz-Carlton Bali', 'Waldorf Astoria Dubai', 'Belmond Cadogan Hotel London',
      "Claridge's London", 'Mandarin Oriental Bangkok', 'The Peninsula Paris',
      'Shangri-La Singapore', 'Four Seasons Resort Bora Bora', 'Atlantis The Royal Dubai',
      'The Oberoi Marrakech', 'Belmond Hotel Cipriani Venice', 'The Ritz-Carlton Kyoto',
      'Aman Venice', 'Six Senses Zighy Bay Oman', 'The Upper House Hong Kong',
      'Capella Singapore', 'The Peninsula Tokyo', 'Gleneagles Scotland',
      'Fairmont Banff Springs Canada',
    ],
  },
  {
    title: 'Budget Hotels Worldwide',
    items: [
      'Bangkok', 'Bali', 'Phuket', 'Istanbul', 'Kuala Lumpur', 'Prague', 'Dubai', 'Cairo',
      'Ho Chi Minh City', 'Hanoi', 'Marrakech', 'Krabi', 'Pattaya', 'Manila', 'Colombo',
      'Cebu', 'Jakarta', 'Antalya', 'Nairobi', 'Cape Town', 'Budapest', 'Warsaw', 'Lisbon',
      'Porto', 'Mexico City', 'Buenos Aires', 'Lima', 'Bogota', 'Amman', 'Beirut', 'Tbilisi',
      'Yerevan', 'Kathmandu', 'Chiang Mai', 'Da Nang', 'Siem Reap', 'Zanzibar',
    ].map((c) => `Budget Hotels in ${c}`),
  },
  {
    title: 'Visa Services',
    items: [
      'USA Visa', 'UK Visa', 'Schengen Visa', 'Canada Visa', 'Australia Visa', 'Dubai Visa',
      'Singapore Visa', 'Thailand Visa', 'Japan Visa', 'New Zealand Visa', 'Turkey Visa',
      'Saudi Arabia Visa', 'Malaysia Visa', 'Indonesia Visa', 'South Korea Visa', 'Egypt Visa',
      'Qatar Visa', 'Vietnam Visa', 'Ireland Visa', 'Switzerland Visa', 'China Visa',
      'Russia Visa', 'Kenya Visa', 'Sri Lanka Visa', 'Morocco Visa', 'Jordan Visa',
      'Oman Visa', 'Bahrain Visa', 'Kuwait Visa', 'Azerbaijan Visa', 'Cambodia Visa',
      'Myanmar Visa', 'Brazil Visa', 'Mexico Visa', 'South Africa Visa', 'Mauritius Visa',
      'Seychelles Visa', 'Bhutan Visa', 'Nepal Visa',
    ],
  },
  {
    title: 'Cruise Destinations',
    items: [
      'Caribbean Cruises', 'Mediterranean Cruises', 'Alaska Cruises', 'Bahamas Cruises',
      'Norwegian Fjords Cruises', 'Dubai Cruises', 'Greek Islands Cruises', 'Baltic Sea Cruises',
      'Singapore Cruises', 'Australia & New Zealand Cruises', 'Red Sea Cruises',
      'Transatlantic Cruises', 'Panama Canal Cruises', 'Hawaii Cruises', 'Antarctica Cruises',
      'Adriatic Sea Cruises', 'Asia Cruises', 'South Pacific Cruises', 'Black Sea Cruises',
      'Canary Islands Cruises', 'Iceland Cruises', 'Amazon River Cruises', 'Nile River Cruises',
      'Danube River Cruises',
    ],
  },
  {
    title: 'Top Attractions Worldwide',
    items: [
      'Eiffel Tower Paris', 'Burj Khalifa Dubai', 'Statue Of Liberty New York', 'Colosseum Rome',
      'Sagrada Familia Barcelona', 'Marina Bay Sands SkyPark Singapore', 'Tokyo Skytree',
      'Petronas Towers Kuala Lumpur', 'Sydney Opera House', 'Grand Canyon USA',
      'Great Wall Of China', 'Santorini Caldera Greece', 'Palm Jumeirah Dubai', 'London Eye',
      'Louvre Museum Paris', 'Angkor Wat Cambodia', 'Machu Picchu Peru', 'Taj Mahal Agra',
      'Niagara Falls', 'Christ The Redeemer Rio', 'Pyramids Of Giza Egypt',
      'Table Mountain Cape Town', 'Golden Gate Bridge San Francisco', 'Times Square New York',
      'Vatican Museums Rome', 'Buckingham Palace London', 'Dubai Miracle Garden',
      'Ha Long Bay Vietnam', 'Petra Jordan', 'Disneyland Paris', 'Universal Studios Singapore',
      'Blue Mosque Istanbul', 'Neuschwanstein Castle Germany', 'Acropolis Athens',
    ],
  },
  {
    title: 'Popular Holiday Packages',
    items: [
      'Bali Packages', 'Maldives Packages', 'Switzerland Packages', 'Thailand Packages',
      'Dubai Packages', 'Singapore Packages', 'Europe Packages', 'Turkey Packages',
      'Mauritius Packages', 'Sri Lanka Packages', 'Vietnam Packages', 'Egypt Packages',
      'Bhutan Packages', 'Seychelles Packages', 'Andaman Packages', 'Kashmir Packages',
      'Malaysia Packages', 'Indonesia Packages', 'Greece Packages', 'Spain Packages',
      'Italy Packages', 'France Packages', 'Japan Packages', 'South Korea Packages',
      'Australia Packages', 'New Zealand Packages', 'South Africa Packages',
      'Kenya Safari Packages', 'Morocco Packages', 'Jordan Packages', 'Iceland Packages',
      'Scandinavia Packages', 'USA Packages', 'Canada Packages', 'Philippines Packages',
    ],
  },
  {
    title: 'Car Rentals By Destination',
    items: [
      'Dubai', 'USA', 'UK', 'Singapore', 'Thailand', 'Malaysia', 'Australia', 'Spain',
      'Italy', 'France', 'Germany', 'Turkey', 'South Africa', 'New Zealand', 'Canada',
      'Japan', 'Portugal', 'Greece', 'Netherlands', 'Switzerland', 'Ireland', 'Iceland',
      'Morocco', 'Egypt', 'Bali', 'Vietnam', 'Mexico', 'Croatia',
    ].map((c) => `Car Rental in ${c}`),
  },
]

const CATEGORY_PREVIEW_COUNT = 5

const PopularSearches = () => {
  const [expanded, setExpanded] = useState(false)
  const visibleCategories = expanded ? CATEGORIES : CATEGORIES.slice(0, CATEGORY_PREVIEW_COUNT)

  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-5 rounded-full" style={{ backgroundColor: ORANGE }} />
          <h2 className="text-lg font-bold" style={{ color: NAVY }}>
            Popular Searches
          </h2>
        </div>

        <div className="relative">
          <div
            className={`divide-y divide-gray-100 transition-[max-height] duration-500 ease-in-out overflow-hidden ${
              expanded ? 'max-h-[8000px]' : 'max-h-[460px]'
            }`}
          >
            {visibleCategories.map((category) => {
              const totalCount = category.groups
                ? category.groups.reduce((sum, g) => sum + g.items.length, 0)
                : category.items.length
              return (
                <div key={category.title} className="py-2.5 first:pt-0">
                  <div className="flex items-baseline justify-between gap-4 mb-1">
                    <h3 className="text-sm font-bold" style={{ color: NAVY }}>
                      {category.title}
                    </h3>
                    <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap">
                      {totalCount} results
                    </span>
                  </div>

                  {category.groups ? (
                    <div className="space-y-3 mt-2">
                      {category.groups.map((group) => (
                        <div key={group.city}>
                          <h4
                            className="text-[12.5px] font-bold mb-0.5"
                            style={{ color: ORANGE }}
                          >
                            {group.city}
                          </h4>
                          <p className="text-[13px] leading-[1.6] text-gray-500">
                            {group.items.map((item, idx) => (
                              <React.Fragment key={item}>
                                <a href="#" className="hover:text-orange-500 transition-colors">
                                  {item}
                                </a>
                                {idx < group.items.length - 1 && (
                                  <span className="text-gray-300"> &nbsp;|&nbsp; </span>
                                )}
                              </React.Fragment>
                            ))}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[13px] leading-[1.6] text-gray-500">
                      {category.items.map((item, idx) => (
                        <React.Fragment key={item}>
                          <a href="#" className="hover:text-orange-500 transition-colors">
                            {item}
                          </a>
                          {idx < category.items.length - 1 && (
                            <span className="text-gray-300"> &nbsp;|&nbsp; </span>
                          )}
                        </React.Fragment>
                      ))}
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          {!expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>

        <div className="flex justify-center mt-2">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold border transition-colors hover:bg-orange-50"
            style={{ color: ORANGE, borderColor: '#FDD9BF' }}
          >
            {expanded ? 'Show less' : 'Show more'}
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>
    </section>
  )
}

export default PopularSearches