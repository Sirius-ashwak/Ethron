import React, { useState, useEffect } from 'react';
import { mockGlobalStats, mockAIAgents } from '../data/mockData';
import { Crisis } from '../types/crisis';
import { 
  Activity, AlertTriangle, Users, Brain, TrendingUp, Globe, Zap, Clock, ChevronRight, Shield, Target, Cpu, Database, ChevronDown, Menu, X, Settings, Bell, Layers, BarChart3, Eye, Wifi, Server, HardDrive, Network, Gauge, Radar, Satellite, Monitor, HeartPulse as Pulse, Waves, Hexagon, Sparkles, Flame, Lightning, Orbit, Atom, Microscope, Telescope, Crosshair, Scan, Radio, Signal, Bluetooth, Rss, Disc, Play, Pause, SkipForward, Volume2, Headphones, Mic, Camera, Video, Image, FileText, Folder, Archive, Download, Upload, Share, Link, Copy, Edit, Trash, Plus, Minus, Check, AlertCircle, Info, HelpCircle, Search, Filter, Sort, Grid, List, Map, Calendar, User, UserPlus, UserMinus, UserCheck, UserX, Lock, Unlock, Key, Security, View, EyeOff, Star, Heart, Bookmark, Flag, Tag, Hash, AtSign, Phone, Mail, MessageCircle, Send, Inbox, Outbox, ArchiveIcon, Trash2, RefreshCw, RotateCcw, RotateCw, Maximize, Minimize, ZoomIn, ZoomOut, Move, Resize, Crop, Scissors, PenTool, Brush, Palette, Pipette, Ruler, Compass, Triangle, Square, Circle, Polygon, Bezier, Spline, Vector, LayersIcon, Group, Ungroup, AlignLeft, AlignCenter, AlignRight, AlignJustify, AlignTop, AlignMiddle, AlignBottom, DistributeHorizontally, DistributeVertically, FlipHorizontal, FlipVertical, RotateLeft, RotateRight, Reflect, Transform, Anchor, Pin, Paperclip, Link2, Unlink, Chain, Shuffle, Repeat, Repeat1, SkipBack, FastForward, Rewind, PlayCircle, PauseCircle, StopCircle, Record, Stop, Eject, VolumeX, Volume1, VolumeOff, Mute, Unmute, Speaker, Headset, Microphone, MicOff, VideoOff, CameraOff, Display, Tv, Smartphone, Tablet, Laptop, Desktop, Watch, Gamepad2, Joystick, Mouse, Keyboard, Printer, Scanner, Fax, Telephone, Voicemail, PhoneCall, PhoneIncoming, PhoneOutgoing, PhoneMissed, PhoneForwarded, PhoneOff, BluetoothIcon, WifiIcon, SignalIcon, Battery, BatteryLow, BatteryCharging, Power, PowerOff, Plug, Unplug, Cable, Usb, Ethernet, Router, Modem, Antenna, SatelliteIcon, RadarIcon, Sonar, Gps, Navigation, CompassIcon, MapIcon, MapPin, MapPinOff, Route, Directions, Location, LocationOff, CrosshairIcon, TargetIcon, Scope, Focus, Zoom, ZoomInIcon, ZoomOutIcon, ScanIcon, QrCode, Barcode, Fingerprint, FaceId, TouchId, UnlockIcon, LockIcon, KeyIcon, Password, SecurityIcon, ShieldIcon, ShieldCheck, ShieldAlert, ShieldX, ShieldOff, Verified, Unverified, Certificate, Award, Badge, Medal, Trophy, Crown, Diamond, Gem, Crystal, Sparkle, Glitter, Magic, Wand, Potion, Elixir, Pill, Capsule, Syringe, Thermometer, Stethoscope, Bandage, FirstAid, Hospital, Ambulance, Emergency, Siren, Fire, FlameIcon, Smoke, Explosion, Bomb, Dynamite, Fireworks, Rocket, Shuttle, Airplane, Helicopter, Drone, Car, Truck, Bus, Train, Subway, Tram, Bicycle, Motorcycle, Scooter, Skateboard, Boat, Ship, Yacht, Submarine, AnchorIcon, Sail, Oar, Paddle, Surfboard, Snowboard, Ski, Sled, Parachute, Balloon, Kite, Umbrella, Tent, Backpack, Luggage, Suitcase, Briefcase, Handbag, Purse, Wallet, CreditCard, BankCard, Cash, Coin, Dollar, Euro, Pound, Yen, Bitcoin, Ethereum, Crypto, Stock, Chart, Graph, Trend, Analytics, Statistics, Data, DatabaseIcon, ServerIcon, Cloud, CloudOff, CloudDownload, CloudUpload, CloudSync, Sync, SyncOff, Refresh, RefreshIcon, Update, Upgrade, DownloadIcon, UploadIcon, Import, Export, Backup, Restore, Save, SaveAs, Open, New, Create, Add, Remove, Delete, Clear, Reset, Undo, Redo, Cut, CopyIcon, Paste, Select, SelectAll, Deselect, Find, Replace, Spell, Grammar, Translate, Language, Book, Library, BookmarkIcon, Page, Pages, Document, File, FolderIcon, ArchiveIcon2, Zip, Unzip, Extract, Compress, Expand, Collapse, MinimizeIcon, MaximizeIcon, Fullscreen, ExitFullscreen, PictureInPicture, Split, Merge, Join, Separate, Divide, Multiply, Calculate, Calculator, Abacus, RulerIcon, Scale, Balance, Weight, Measure, GaugeIcon, Meter, Speedometer, Tachometer, Odometer, Altimeter, Barometer, Hygrometer, Anemometer, Seismometer, Geiger, MicroscopeIcon, TelescopeIcon, Binoculars, Magnifier, Lens, Prism, Mirror, Laser, Flashlight, Torch, Candle, Lightbulb, Lamp, Lantern, Chandelier, Spotlight, Strobe, Neon, Led, Fluorescent, Incandescent, Halogen, Xenon, Sodium, Mercury, Argon, Helium, Hydrogen, Oxygen, Nitrogen, Carbon, Silicon, Iron, Gold, Silver, Copper, Aluminum, Titanium, Steel, Plastic, Glass, Wood, Stone, Concrete, Brick, Metal, Fabric, Leather, Paper, Cardboard, Foam, Rubber, Ceramic, CrystalIcon, DiamondIcon, Emerald, Ruby, Sapphire, Topaz, Amethyst, Quartz, Granite, Marble, Slate, Sandstone, Limestone, Chalk, Clay, Sand, Gravel, Pebble, Rock, Boulder, Mountain, Hill, Valley, Canyon, Cave, Cliff, Beach, Desert, Forest, Jungle, Swamp, Lake, River, Stream, Waterfall, Ocean, Sea, Island, Peninsula, Continent, Planet, Moon, Sun, StarIcon, Galaxy, Universe, Cosmos, Space, Void, Black, White, Gray, Red, Orange, Yellow, Green, Blue, Purple, Pink, Brown, Tan, Beige, Cream, Ivory, Snow, Ice, Frost, Steam, Mist, Fog, CloudIcon, Rain, SnowIcon, Hail, Sleet, Thunder, LightningIcon, Wind, Breeze, Gale, Hurricane, Tornado, Cyclone, Typhoon, Storm, Tempest, Blizzard, Avalanche, Earthquake, Tsunami, Volcano, Eruption, Lava, Magma, Ash, Dust, SmokeIcon, Smog, Pollution, Contamination, Radiation, Toxic, Poison, Acid, Base, Salt, Sugar, Spice, Herb, Flower, Plant, Tree, Leaf, Branch, Root, Seed, Fruit, Vegetable, Grain, Nut, Berry, Mushroom, Fungus, Bacteria, Virus, Germ, Cell, Molecule, AtomIcon, Electron, Proton, Neutron, Nucleus, OrbitIcon, Spin, Rotate, Revolve, Oscillate, Vibrate, Wave, Frequency, Amplitude, Wavelength, Spectrum, PrismIcon, Refraction, Reflection, Diffraction, Interference, Resonance, Echo, Sound, Noise, Music, Melody, Harmony, Rhythm, Beat, Tempo, Pitch, Tone, Volume, Bass, Treble, Equalizer, Amplifier, SpeakerIcon, Subwoofer, Tweeter, Woofer, Driver, Cone, Magnet, Coil, Diaphragm, Membrane, CapsuleIcon, MicrophoneIcon, Pickup, Transducer, Sensor, Detector, Probe, AntennaIcon, Receiver, Transmitter, Transponder, Repeater, Relay, Switch, RouterIcon, Hub, Gateway, Bridge, Firewall, Proxy, Cache, Buffer, Memory, Storage, Disk, Drive, Partition, Sector, Cluster, Block, Byte, Bit, Binary, Decimal, Hexadecimal, Octal, ASCII, Unicode, UTF, Encoding, Decoding, Encryption, Decryption, HashIcon, Checksum, CRC, Parity, Error, Exception, Bug, Debug, Test, Validate, Verify, Authenticate, Authorize, Login, Logout, Signin, Signup, Register, Unregister, Subscribe, Unsubscribe, Follow, Unfollow, Like, Unlike, Love, Hate, Favorite, Unfavorite, Rate, Review, Comment, Reply, ShareIcon, Repost, Forward, Redirect, LinkIcon, Hyperlink, URL, URI, Domain, Subdomain, Path, Query, Parameter, Variable, Constant, Function, Method, Class, Object, Instance, Property, Attribute, Value, Type, String, Number, Boolean, Array, Set, MapIcon2, Table, Row, Column, Cell, Field, Record, Entry, Item, Element, Node, Edge, Graph, Tree, BranchIcon, LeafIcon, RootIcon, Parent, Child, Sibling, Ancestor, Descendant, Generation, Level, Depth, Height, Width, Length, Size, ScaleIcon, Ratio, Proportion, Percentage, Fraction, DecimalIcon, Integer, Float, Double, Long, Short, ByteIcon, Word, Dword, Qword, BitIcon, FlagIcon, RegisterIcon, Counter, Timer, ClockIcon, Stopwatch, Alarm, Reminder, Notification, AlertIcon, Warning, ErrorIcon, InfoIcon, Success, Failure, Pending, Loading, Processing, Waiting, Ready, Done, Complete, Incomplete, Partial, Full, Empty, Null, Undefined, NaN, Infinity, Zero, One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Hundred, Thousand, Million, Billion, Trillion, Quadrillion, Quintillion, Sextillion, Septillion, Octillion, Nonillion, Decillion, Alpha, Beta, Gamma, Delta, Epsilon, Zeta, Eta, Theta, Iota, Kappa, Lambda, Mu, Nu, Xi, Omicron, Pi, Rho, Sigma, Tau, Upsilon, Phi, Chi, Psi, Omega
} from 'lucide-react';

interface DashboardProps {
  crises: Crisis[];
}

export default function Dashboard({ crises }: DashboardProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<'overview' | 'neural' | 'quantum' | 'matrix' | 'nexus'>('overview');
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['neural', 'quantum']));
  const [animationStates, setAnimationStates] = useState<Record<string, boolean>>({});
  const [realTimeData, setRealTimeData] = useState({
    neuralActivity: 94.7,
    quantumCoherence: 87.3,
    matrixStability: 91.2,
    nexusConnections: 1247,
    threatLevel: 'ELEVATED',
    globalPulse: 847
  });

  const activeCrises = crises.filter(c => c.severity === 'high' || c.severity === 'critical');
  const totalAffected = crises.reduce((sum, crisis) => sum + crisis.affectedPopulation, 0);

  // Advanced real-time data simulation with quantum fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        neuralActivity: Math.max(80, Math.min(99, prev.neuralActivity + (Math.random() - 0.5) * 2)),
        quantumCoherence: Math.max(70, Math.min(95, prev.quantumCoherence + (Math.random() - 0.5) * 3)),
        matrixStability: Math.max(85, Math.min(98, prev.matrixStability + (Math.random() - 0.5) * 1.5)),
        nexusConnections: prev.nexusConnections + Math.floor((Math.random() - 0.5) * 100),
        threatLevel: ['MINIMAL', 'LOW', 'MODERATE', 'ELEVATED', 'HIGH', 'CRITICAL'][Math.floor(Math.random() * 6)],
        globalPulse: prev.globalPulse + Math.floor((Math.random() - 0.5) * 50)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Smooth animation trigger with quantum timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStates({ loaded: true, quantum: true, neural: true });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const QuantumMetricCard = ({ 
    icon: Icon, 
    label, 
    value, 
    unit = '', 
    change, 
    changeType = 'neutral',
    accent = 'cyan',
    size = 'normal',
    delay = 0,
    isQuantum = false,
    neuralActivity = false
  }: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    unit?: string;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    accent?: 'cyan' | 'purple' | 'green' | 'orange' | 'red' | 'blue' | 'pink' | 'quantum' | 'neural';
    size?: 'normal' | 'large' | 'massive';
    delay?: number;
    isQuantum?: boolean;
    neuralActivity?: boolean;
  }) => {
    const [isCardVisible, setIsCardVisible] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    const [quantumFlux, setQuantumFlux] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => setIsCardVisible(true), delay);
      return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
      if (isQuantum) {
        const interval = setInterval(() => {
          setQuantumFlux(Math.sin(Date.now() / 1000) * 0.1);
        }, 50);
        return () => clearInterval(interval);
      }
    }, [isQuantum]);

    const accentColors = {
      cyan: 'from-cyan-400/20 via-cyan-500/10 to-transparent',
      purple: 'from-purple-400/20 via-purple-500/10 to-transparent',
      green: 'from-emerald-400/20 via-emerald-500/10 to-transparent',
      orange: 'from-orange-400/20 via-orange-500/10 to-transparent',
      red: 'from-red-400/20 via-red-500/10 to-transparent',
      blue: 'from-blue-400/20 via-blue-500/10 to-transparent',
      pink: 'from-pink-400/20 via-pink-500/10 to-transparent',
      quantum: 'from-purple-400/30 via-cyan-400/20 to-pink-400/30',
      neural: 'from-green-400/30 via-blue-400/20 to-purple-400/30'
    };

    const iconColors = {
      cyan: 'text-cyan-400',
      purple: 'text-purple-400',
      green: 'text-emerald-400',
      orange: 'text-orange-400',
      red: 'text-red-400',
      blue: 'text-blue-400',
      pink: 'text-pink-400',
      quantum: 'text-purple-400',
      neural: 'text-green-400'
    };

    const borderColors = {
      cyan: 'border-cyan-500/30 hover:border-cyan-400/60',
      purple: 'border-purple-500/30 hover:border-purple-400/60',
      green: 'border-emerald-500/30 hover:border-emerald-400/60',
      orange: 'border-orange-500/30 hover:border-orange-400/60',
      red: 'border-red-500/30 hover:border-red-400/60',
      blue: 'border-blue-500/30 hover:border-blue-400/60',
      pink: 'border-pink-500/30 hover:border-pink-400/60',
      quantum: 'border-purple-500/40 hover:border-cyan-400/60',
      neural: 'border-green-500/40 hover:border-blue-400/60'
    };

    return (
      <div 
        className={`relative overflow-hidden rounded-3xl bg-black/40 backdrop-blur-2xl border ${borderColors[accent]} transition-all duration-1000 ease-out cursor-pointer group hover:scale-[1.02] hover:bg-black/60 ${
          isCardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } ${size === 'massive' ? 'col-span-2' : ''}`}
        style={{ 
          transitionDelay: `${delay}ms`,
          transform: isQuantum ? `scale(${1 + quantumFlux})` : undefined
        }}
      >
        {/* Quantum Field Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${accentColors[accent]} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
        
        {/* Neural Network Pattern */}
        {neuralActivity && (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                               radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                               radial-gradient(circle at 40% 60%, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
              backgroundSize: '50px 50px, 30px 30px, 40px 40px',
              animation: 'neural-pulse 3s ease-in-out infinite'
            }}></div>
          </div>
        )}
        
        {/* Holographic Reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Quantum Shimmer */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
        
        <div className={`relative p-${size === 'massive' ? '8' : size === 'large' ? '6' : '5'} z-10`}>
          <div className="flex items-center justify-between mb-6">
            <div className={`p-4 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/20 group-hover:bg-black/50 group-hover:scale-110 transition-all duration-500`}>
              <Icon className={`w-${size === 'massive' ? '8' : size === 'large' ? '6' : '5'} h-${size === 'massive' ? '8' : size === 'large' ? '6' : '5'} ${iconColors[accent]}`} />
              {isQuantum && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50"></div>
              )}
              {neuralActivity && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              )}
            </div>
            {change && (
              <div className={`px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 ${
                changeType === 'positive' ? 'text-emerald-400' :
                changeType === 'negative' ? 'text-red-400' :
                'text-gray-400'
              }`}>
                <span className="text-xs font-mono font-bold">{change}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="flex items-baseline space-x-3">
              <span className={`${size === 'massive' ? 'text-5xl' : size === 'large' ? 'text-3xl' : 'text-2xl'} font-extralight text-white tracking-tight`}>
                {typeof currentValue === 'number' ? currentValue.toLocaleString() : currentValue}
              </span>
              {unit && <span className="text-sm text-gray-400 font-mono">{unit}</span>}
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">
              {label}
            </div>
          </div>

          {/* Quantum Energy Bar */}
          {isQuantum && (
            <div className="mt-6">
              <div className="text-xs text-purple-400 mb-2 font-mono">QUANTUM COHERENCE</div>
              <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 rounded-full transition-all duration-1000 animate-pulse"
                  style={{ width: `${typeof currentValue === 'number' ? Math.min(100, currentValue) : 85}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Neural Activity Waves */}
          {neuralActivity && (
            <div className="mt-6 h-12 flex items-end space-x-1">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-green-500 to-emerald-400 rounded-sm"
                  style={{ 
                    height: `${Math.sin((Date.now() / 1000 + i * 0.5)) * 20 + 30}px`,
                    animation: `neural-wave 2s ease-in-out infinite`,
                    animationDelay: `${i * 100}ms`
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>

        {/* Quantum Border Animation */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 rounded-3xl border-2 ${borderColors[accent]} animate-pulse`}></div>
        </div>
      </div>
    );
  };

  const QuantumModule = ({ 
    id,
    title, 
    status, 
    children,
    icon: Icon,
    delay = 0,
    badge,
    quantum = false,
    neural = false
  }: {
    id: string;
    title: string;
    status: 'operational' | 'quantum' | 'neural' | 'critical';
    children: React.ReactNode;
    icon: React.ElementType;
    delay?: number;
    badge?: string;
    quantum?: boolean;
    neural?: boolean;
  }) => {
    const [isModuleVisible, setIsModuleVisible] = useState(false);
    const isExpanded = expandedModules.has(id);

    useEffect(() => {
      const timer = setTimeout(() => setIsModuleVisible(true), delay);
      return () => clearTimeout(timer);
    }, [delay]);
    
    const statusColors = {
      operational: 'border-emerald-500/30 bg-emerald-500/10 hover:border-emerald-400/60',
      quantum: 'border-purple-500/30 bg-purple-500/10 hover:border-purple-400/60',
      neural: 'border-green-500/30 bg-green-500/10 hover:border-green-400/60',
      critical: 'border-red-500/30 bg-red-500/10 hover:border-red-400/60'
    };

    const statusDots = {
      operational: 'bg-emerald-400 shadow-emerald-400/50',
      quantum: 'bg-purple-400 shadow-purple-400/50',
      neural: 'bg-green-400 shadow-green-400/50',
      critical: 'bg-red-400 shadow-red-400/50'
    };

    return (
      <div 
        className={`rounded-3xl border ${statusColors[status]} backdrop-blur-2xl overflow-hidden transition-all duration-1000 ease-out hover:scale-[1.01] ${
          isModuleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {/* Quantum Field Background */}
        {quantum && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-cyan-500/5 to-pink-500/5 animate-pulse"></div>
        )}
        
        {/* Neural Network Background */}
        {neural && (
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5"></div>
        )}
        
        {/* Holographic Reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        
        <button
          onClick={() => toggleModule(id)}
          className="relative w-full p-6 flex items-center justify-between hover:bg-white/5 transition-all duration-500 group"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/20 group-hover:bg-black/50 group-hover:scale-110 transition-all duration-500">
              <Icon className="w-6 h-6 text-gray-300" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">{title}</h3>
            {badge && (
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-mono rounded-full border border-cyan-500/30">
                {badge}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${statusDots[status]} animate-pulse shadow-lg`}></div>
              <span className="text-xs text-gray-400 font-mono uppercase tracking-widest">
                {status}
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-all duration-500 ${isExpanded ? 'rotate-180' : ''} group-hover:text-white`} />
          </div>
        </button>
        
        <div className={`transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="p-6 pt-0 border-t border-white/10">
            {children}
          </div>
        </div>
      </div>
    );
  };

  const NavigationTab = ({ 
    id, 
    label, 
    icon: Icon, 
    isActive, 
    onClick,
    delay = 0,
    badge,
    quantum = false,
    neural = false
  }: {
    id: string;
    label: string;
    icon: React.ElementType;
    isActive: boolean;
    onClick: () => void;
    delay?: number;
    badge?: string;
    quantum?: boolean;
    neural?: boolean;
  }) => {
    const [isTabVisible, setIsTabVisible] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setIsTabVisible(true), delay);
      return () => clearTimeout(timer);
    }, [delay]);

    return (
      <button
        onClick={onClick}
        className={`relative flex items-center space-x-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all duration-500 group overflow-hidden ${
          isActive 
            ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-300 shadow-lg border border-cyan-500/40 backdrop-blur-sm' 
            : 'text-gray-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
        } ${isTabVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {/* Quantum Field Effect */}
        {isActive && quantum && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-600/20 rounded-2xl animate-pulse"></div>
        )}
        
        {/* Neural Network Effect */}
        {isActive && neural && (
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-600/20 rounded-2xl"></div>
        )}
        
        <Icon className="w-5 h-5 relative z-10" />
        {!isCollapsed && (
          <div className="flex items-center space-x-2 relative z-10">
            <span className="uppercase tracking-wider">{label}</span>
            {badge && (
              <span className="px-2 py-1 bg-cyan-500/30 text-cyan-300 text-xs font-mono rounded-full">
                {badge}
              </span>
            )}
          </div>
        )}
        
        {/* Holographic Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
      </button>
    );
  };

  const QuantumSystemMetric = ({ 
    icon: Icon, 
    label, 
    value, 
    unit, 
    status = 'normal',
    trend = 'stable',
    quantum = false
  }: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    unit: string;
    status?: 'normal' | 'warning' | 'critical' | 'quantum';
    trend?: 'up' | 'down' | 'stable';
    quantum?: boolean;
  }) => {
    const statusColors = {
      normal: 'text-emerald-400',
      warning: 'text-yellow-400',
      critical: 'text-red-400',
      quantum: 'text-purple-400'
    };

    const trendIcons = {
      up: '↗',
      down: '↘',
      stable: '→'
    };

    return (
      <div className="flex items-center justify-between p-4 bg-black/30 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-black/50 hover:border-white/20 transition-all duration-500 group">
        <div className="flex items-center space-x-3">
          <Icon className={`w-5 h-5 ${statusColors[status]} group-hover:scale-110 transition-transform duration-300`} />
          <span className="text-sm text-gray-300 font-mono uppercase tracking-wider">{label}</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-white font-mono font-bold">{value}{unit}</span>
          <span className="text-xs text-gray-500">{trendIcons[trend]}</span>
          {quantum && (
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50"></div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`fixed left-0 top-20 bottom-0 ${isCollapsed ? 'w-24' : 'w-[420px]'} bg-gradient-to-br from-black/80 via-slate-900/80 to-black/80 backdrop-blur-3xl border-r border-white/10 overflow-y-auto transition-all duration-700 ease-in-out z-40`}>
      {/* Quantum Field Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black/30 to-cyan-900/20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent"></div>
      
      {/* Neural Network Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                           radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 40px 40px, 80px 80px',
          animation: 'neural-pulse 4s ease-in-out infinite'
        }}></div>
      </div>
      
      <div className="relative z-10 p-6 space-y-8">
        {/* Header with Quantum Branding */}
        <div className={`flex items-center justify-between transition-all duration-500 ${animationStates.loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          {!isCollapsed && (
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Atom className="w-8 h-8 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <div className="absolute inset-0 bg-cyan-400 rounded-full blur-sm opacity-30 animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white tracking-tight">QUANTUM NEXUS</h1>
                  <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">NEURAL CRISIS MATRIX</p>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-500 border border-transparent hover:border-white/20 backdrop-blur-sm group"
            >
              {isCollapsed ? <Atom className="w-6 h-6 animate-spin group-hover:animate-pulse" /> : <Orbit className="w-6 h-6 group-hover:animate-spin" />}
            </button>
            <button
              onClick={handleClose}
              className="p-3 text-gray-400 hover:text-white hover:bg-red-500/20 rounded-2xl transition-all duration-500 border border-transparent hover:border-red-500/30 backdrop-blur-sm"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <>
            {/* Quantum Navigation */}
            <div className="grid grid-cols-1 gap-3">
              <NavigationTab
                id="overview"
                label="Quantum Overview"
                icon={Atom}
                isActive={activeSection === 'overview'}
                onClick={() => setActiveSection('overview')}
                delay={100}
                badge={activeCrises.length.toString()}
                quantum={true}
              />
              <NavigationTab
                id="neural"
                label="Neural Network"
                icon={Brain}
                isActive={activeSection === 'neural'}
                onClick={() => setActiveSection('neural')}
                delay={150}
                badge="ACTIVE"
                neural={true}
              />
              <NavigationTab
                id="quantum"
                label="Quantum Field"
                icon={Zap}
                isActive={activeSection === 'quantum'}
                onClick={() => setActiveSection('quantum')}
                delay={200}
                badge="COHERENT"
                quantum={true}
              />
              <NavigationTab
                id="matrix"
                label="Threat Matrix"
                icon={Crosshair}
                isActive={activeSection === 'matrix'}
                onClick={() => setActiveSection('matrix')}
                delay={250}
                badge="SCANNING"
              />
              <NavigationTab
                id="nexus"
                label="Global Nexus"
                icon={Globe}
                isActive={activeSection === 'nexus'}
                onClick={() => setActiveSection('nexus')}
                delay={300}
                badge="CONNECTED"
              />
            </div>

            {/* Content based on active section */}
            {activeSection === 'overview' && (
              <>
                {/* Quantum Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <QuantumMetricCard
                    icon={Atom}
                    label="QUANTUM COHERENCE"
                    value={realTimeData.quantumCoherence.toFixed(1)}
                    unit="%"
                    change="+2.3%"
                    changeType="positive"
                    accent="quantum"
                    delay={300}
                    isQuantum={true}
                  />
                  <QuantumMetricCard
                    icon={Brain}
                    label="NEURAL ACTIVITY"
                    value={realTimeData.neuralActivity.toFixed(1)}
                    unit="%"
                    change="+1.7%"
                    changeType="positive"
                    accent="neural"
                    delay={350}
                    neuralActivity={true}
                  />
                  <QuantumMetricCard
                    icon={AlertTriangle}
                    label="THREAT LEVEL"
                    value={realTimeData.threatLevel}
                    change="ELEVATED"
                    changeType="negative"
                    accent="red"
                    delay={400}
                  />
                  <QuantumMetricCard
                    icon={Globe}
                    label="GLOBAL PULSE"
                    value={realTimeData.globalPulse}
                    unit=" TPS"
                    change="ACTIVE"
                    changeType="neutral"
                    accent="cyan"
                    delay={450}
                  />
                </div>

                {/* Massive Quantum Status Card */}
                <QuantumMetricCard
                  icon={Orbit}
                  label="MATRIX STABILITY INDEX"
                  value={realTimeData.matrixStability.toFixed(1)}
                  unit="% STABLE"
                  change="+0.8%"
                  changeType="positive"
                  accent="quantum"
                  size="massive"
                  delay={500}
                  isQuantum={true}
                  neuralActivity={true}
                />

                {/* Quantum System Status */}
                <QuantumModule 
                  id="quantum-core" 
                  title="QUANTUM CORE SYSTEMS" 
                  status="quantum" 
                  icon={Atom} 
                  delay={600}
                  badge="COHERENT"
                  quantum={true}
                >
                  <div className="space-y-4">
                    <QuantumSystemMetric
                      icon={Cpu}
                      label="QUANTUM PROCESSING"
                      value={realTimeData.globalPulse}
                      unit=" QPS"
                      status="quantum"
                      trend="up"
                      quantum={true}
                    />
                    <QuantumSystemMetric
                      icon={Database}
                      label="NEURAL PATHWAYS"
                      value="∞"
                      unit=" ACTIVE"
                      status="normal"
                      trend="stable"
                    />
                    <QuantumSystemMetric
                      icon={Network}
                      label="QUANTUM ENTANGLEMENT"
                      value={realTimeData.nexusConnections}
                      unit=" NODES"
                      status="quantum"
                      trend="up"
                      quantum={true}
                    />
                    <QuantumSystemMetric
                      icon={Shield}
                      label="MATRIX INTEGRITY"
                      value="SECURED"
                      unit=""
                      status="normal"
                      trend="stable"
                    />
                  </div>
                </QuantumModule>

                {/* Neural Network Status */}
                <QuantumModule 
                  id="neural-network" 
                  title="NEURAL NETWORK MATRIX" 
                  status="neural" 
                  icon={Brain} 
                  delay={700}
                  badge="LEARNING"
                  neural={true}
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-black/30 rounded-2xl backdrop-blur-sm border border-green-500/20">
                        <div className="text-2xl font-mono font-bold text-green-400">{realTimeData.neuralActivity.toFixed(1)}%</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">NEURAL SYNC</div>
                      </div>
                      <div className="text-center p-4 bg-black/30 rounded-2xl backdrop-blur-sm border border-blue-500/20">
                        <div className="text-2xl font-mono font-bold text-blue-400">∞</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">SYNAPSES</div>
                      </div>
                    </div>
                    <div className="h-20 bg-black/50 rounded-2xl p-4 flex items-end space-x-1">
                      {[...Array(30)].map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-green-500 to-emerald-400 rounded-sm"
                          style={{ 
                            height: `${Math.sin((Date.now() / 1000 + i * 0.3)) * 30 + 40}px`,
                            animation: `neural-wave 3s ease-in-out infinite`,
                            animationDelay: `${i * 50}ms`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </QuantumModule>
              </>
            )}

            {activeSection === 'neural' && (
              <QuantumModule 
                id="neural-core" 
                title="NEURAL CORE INTELLIGENCE" 
                status="neural" 
                icon={Brain} 
                delay={300}
                badge="EVOLVING"
                neural={true}
              >
                <div className="space-y-6">
                  {mockAIAgents.map((agent, index) => (
                    <div key={agent.id} className="group p-5 bg-black/30 rounded-2xl backdrop-blur-sm border border-green-500/20 hover:bg-black/50 hover:border-green-400/40 transition-all duration-500 cursor-pointer">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-2xl border border-green-500/40 bg-gradient-to-br from-green-500/30 to-emerald-600/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <span className="text-lg text-green-400 font-mono font-bold">
                              {agent.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm text-white font-mono font-bold uppercase tracking-wider">{agent.name}</div>
                            <div className="text-xs text-gray-400">{agent.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full shadow-lg ${
                            agent.status === 'active' ? 'bg-green-400 shadow-green-400/50 animate-pulse' :
                            agent.status === 'processing' ? 'bg-yellow-400 shadow-yellow-400/50 animate-pulse' :
                            'bg-gray-500'
                          }`}></div>
                          <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
                            {agent.status}
                          </span>
                        </div>
                      </div>
                      
                      {/* Neural Performance Matrix */}
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-3 bg-black/50 rounded-xl border border-green-500/20">
                          <div className="text-xs text-green-400 font-mono font-bold">{Math.floor(Math.random() * 100)}%</div>
                          <div className="text-2xs text-gray-500 uppercase tracking-wider">ACCURACY</div>
                        </div>
                        <div className="p-3 bg-black/50 rounded-xl border border-cyan-500/20">
                          <div className="text-xs text-cyan-400 font-mono font-bold">{Math.floor(Math.random() * 500)}ms</div>
                          <div className="text-2xs text-gray-500 uppercase tracking-wider">RESPONSE</div>
                        </div>
                        <div className="p-3 bg-black/50 rounded-xl border border-purple-500/20">
                          <div className="text-xs text-purple-400 font-mono font-bold">{Math.floor(Math.random() * 50)}k</div>
                          <div className="text-2xs text-gray-500 uppercase tracking-wider">PROCESSED</div>
                        </div>
                      </div>

                      {/* Neural Activity Visualization */}
                      <div className="mt-4 h-8 flex items-end space-x-1">
                        {[...Array(15)].map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-green-500 to-emerald-400 rounded-sm"
                            style={{ 
                              height: `${Math.sin((Date.now() / 1000 + i * 0.4)) * 15 + 20}px`,
                              animation: `neural-wave 2s ease-in-out infinite`,
                              animationDelay: `${i * 80}ms`
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </QuantumModule>
            )}

            {activeSection === 'quantum' && (
              <QuantumModule 
                id="quantum-field" 
                title="QUANTUM FIELD DYNAMICS" 
                status="quantum" 
                icon={Zap} 
                delay={300}
                badge="ENTANGLED"
                quantum={true}
              >
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'COHERENCE', value: `${realTimeData.quantumCoherence.toFixed(1)}%`, color: 'purple', icon: Atom },
                      { label: 'ENTANGLEMENT', value: '∞', color: 'cyan', icon: Orbit },
                      { label: 'SUPERPOSITION', value: 'ACTIVE', color: 'pink', icon: Zap },
                      { label: 'DECOHERENCE', value: '0.001%', color: 'green', icon: Shield }
                    ].map((metric, index) => (
                      <div key={metric.label} className="text-center p-5 bg-black/30 rounded-2xl backdrop-blur-sm border border-purple-500/20 hover:bg-black/50 hover:border-purple-400/40 transition-all duration-500 group">
                        <metric.icon className={`w-8 h-8 mx-auto mb-3 ${
                          metric.color === 'purple' ? 'text-purple-400' :
                          metric.color === 'cyan' ? 'text-cyan-400' :
                          metric.color === 'pink' ? 'text-pink-400' :
                          'text-green-400'
                        } group-hover:scale-110 transition-transform duration-500`} />
                        <div className={`text-xl font-mono font-bold mb-2 ${
                          metric.color === 'purple' ? 'text-purple-400' :
                          metric.color === 'cyan' ? 'text-cyan-400' :
                          metric.color === 'pink' ? 'text-pink-400' :
                          'text-green-400'
                        }`}>
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Quantum Field Visualization */}
                  <div className="bg-black/50 rounded-2xl p-5 border border-purple-500/20">
                    <div className="text-sm text-purple-400 mb-4 font-mono uppercase tracking-wider">QUANTUM FIELD MATRIX</div>
                    <div className="h-32 relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/30 to-cyan-900/30">
                      {/* Quantum Particles */}
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${1 + Math.random() * 2}s`
                          }}
                        />
                      ))}
                      
                      {/* Quantum Waves */}
                      <div className="absolute inset-0 opacity-30">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute inset-0 border border-cyan-400/30 rounded-full"
                            style={{
                              animation: `quantum-ripple ${3 + i}s ease-in-out infinite`,
                              animationDelay: `${i * 0.5}s`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </QuantumModule>
            )}

            {activeSection === 'matrix' && (
              <QuantumModule 
                id="threat-matrix" 
                title="THREAT DETECTION MATRIX" 
                status="critical" 
                icon={Crosshair} 
                delay={300}
                badge="SCANNING"
              >
                <div className="space-y-4">
                  {[
                    { level: 'CRITICAL', count: crises.filter(c => c.severity === 'critical').length, color: 'red', threat: 'IMMINENT', probability: 94 },
                    { level: 'HIGH', count: crises.filter(c => c.severity === 'high').length, color: 'orange', threat: 'ELEVATED', probability: 78 },
                    { level: 'MEDIUM', count: crises.filter(c => c.severity === 'medium').length, color: 'yellow', threat: 'MODERATE', probability: 45 },
                    { level: 'LOW', count: crises.filter(c => c.severity === 'low').length, color: 'green', threat: 'MINIMAL', probability: 12 }
                  ].map((threat, index) => (
                    <div key={threat.level} className="p-5 bg-black/30 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-black/50 hover:border-white/20 transition-all duration-500 group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-4 h-4 rounded-full ${
                            threat.color === 'red' ? 'bg-red-400 shadow-red-400/50' :
                            threat.color === 'orange' ? 'bg-orange-400 shadow-orange-400/50' :
                            threat.color === 'yellow' ? 'bg-yellow-400 shadow-yellow-400/50' :
                            'bg-green-400 shadow-green-400/50'
                          } animate-pulse shadow-lg`}></div>
                          <span className="text-sm text-white font-mono font-bold uppercase tracking-wider">{threat.level}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                            threat.color === 'red' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                            threat.color === 'orange' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                            threat.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                            'bg-green-500/20 text-green-300 border border-green-500/30'
                          }`}>
                            {threat.threat}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-mono font-bold ${
                            threat.color === 'red' ? 'text-red-400' :
                            threat.color === 'orange' ? 'text-orange-400' :
                            threat.color === 'yellow' ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>
                            {threat.count}
                          </div>
                          <div className="text-xs text-gray-500 font-mono">ACTIVE</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-black/50 rounded-xl">
                          <div className="text-lg font-mono font-bold text-cyan-400">{threat.probability}%</div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider">PROBABILITY</div>
                        </div>
                        <div className="text-center p-3 bg-black/50 rounded-xl">
                          <div className="text-lg font-mono font-bold text-purple-400">{Math.floor(Math.random() * 24)}h</div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider">ETA</div>
                        </div>
                      </div>

                      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-out group-hover:scale-105 ${
                            threat.color === 'red' ? 'bg-gradient-to-r from-red-500 to-red-400' :
                            threat.color === 'orange' ? 'bg-gradient-to-r from-orange-500 to-orange-400' :
                            threat.color === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                            'bg-gradient-to-r from-green-500 to-green-400'
                          }`}
                          style={{ width: `${threat.probability}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </QuantumModule>
            )}

            {activeSection === 'nexus' && (
              <QuantumModule 
                id="global-nexus" 
                title="GLOBAL NEXUS NETWORK" 
                status="operational" 
                icon={Globe} 
                delay={300}
                badge="CONNECTED"
              >
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'NODES', value: realTimeData.nexusConnections, color: 'cyan', icon: Network },
                      { label: 'REGIONS', value: '127', color: 'purple', icon: Globe },
                      { label: 'UPTIME', value: '99.7%', color: 'green', icon: Shield },
                      { label: 'LATENCY', value: '0.3s', color: 'orange', icon: Zap }
                    ].map((metric, index) => (
                      <div key={metric.label} className="text-center p-5 bg-black/30 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-black/50 hover:border-white/20 transition-all duration-500 group">
                        <metric.icon className={`w-8 h-8 mx-auto mb-3 ${
                          metric.color === 'cyan' ? 'text-cyan-400' :
                          metric.color === 'purple' ? 'text-purple-400' :
                          metric.color === 'green' ? 'text-green-400' :
                          'text-orange-400'
                        } group-hover:scale-110 transition-transform duration-500`} />
                        <div className={`text-xl font-mono font-bold mb-2 ${
                          metric.color === 'cyan' ? 'text-cyan-400' :
                          metric.color === 'purple' ? 'text-purple-400' :
                          metric.color === 'green' ? 'text-green-400' :
                          'text-orange-400'
                        }`}>
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Global Network Visualization */}
                  <div className="bg-black/50 rounded-2xl p-5 border border-cyan-500/20">
                    <div className="text-sm text-cyan-400 mb-4 font-mono uppercase tracking-wider">GLOBAL NETWORK STATUS</div>
                    <div className="h-32 relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
                      {/* Network Nodes */}
                      {[...Array(15)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"
                          style={{
                            left: `${Math.random() * 90 + 5}%`,
                            top: `${Math.random() * 80 + 10}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${1 + Math.random()}s`
                          }}
                        />
                      ))}
                      
                      {/* Connection Lines */}
                      <svg className="absolute inset-0 w-full h-full opacity-30">
                        {[...Array(8)].map((_, i) => (
                          <line
                            key={i}
                            x1={`${Math.random() * 100}%`}
                            y1={`${Math.random() * 100}%`}
                            x2={`${Math.random() * 100}%`}
                            y2={`${Math.random() * 100}%`}
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-cyan-400 animate-pulse"
                          />
                        ))}
                      </svg>
                    </div>
                  </div>
                </div>
              </QuantumModule>
            )}
          </>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes neural-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        @keyframes neural-wave {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1.2); }
        }
        
        @keyframes quantum-ripple {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </div>
  );
}