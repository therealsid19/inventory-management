'use client';
import { useEffect, useState } from 'react';
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material';
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { firestore, auth } from '@/firebase'; 
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      updateInventory();
    }
  }, [user]);

  const updateInventory = async () => {
    if (user) {
      try {
        console.log('Fetching inventory data...');
        const userInventoryRef = collection(firestore, 'users', user.uid, 'inventory');
        const snapshot = query(userInventoryRef);
        const docs = await getDocs(snapshot);
        const inventoryList = [];
        docs.forEach((doc) => {
          inventoryList.push({ name: doc.id, ...doc.data() });
        });
        console.log('Fetched inventory data:', inventoryList);
        setInventory(inventoryList);
        setFilteredInventory(inventoryList);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    }
  };

  const addItem = async (item) => {
    if (user) {
      try {
        const userInventoryRef = doc(collection(firestore, 'users', user.uid, 'inventory'), item);
        const docSnap = await getDoc(userInventoryRef);
        if (docSnap.exists()) {
          const { quantity } = docSnap.data();
          await setDoc(userInventoryRef, { quantity: quantity + 1 });
        } else {
          await setDoc(userInventoryRef, { quantity: 1 });
        }
        await updateInventory();
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  };

  const removeItem = async (item) => {
    if (user) {
      try {
        const userInventoryRef = doc(collection(firestore, 'users', user.uid, 'inventory'), item);
        const docSnap = await getDoc(userInventoryRef);
        if (docSnap.exists()) {
          const { quantity } = docSnap.data();
          if (quantity === 1) {
            await deleteDoc(userInventoryRef);
          } else {
            await setDoc(userInventoryRef, { quantity: quantity - 1 });
          }
        }
        await updateInventory();
      } catch (error) {
        console.error('Error removing item:', error);
      }
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setFilteredInventory(inventory.filter(item => item.name.toLowerCase().includes(query.toLowerCase())));
    } else {
      setFilteredInventory(inventory);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/'); 
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Box
      width="98.5%"
      height="94vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}


    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Box border={'1px solid #333'}>
        <Box
          width="1291px"
          height="100px"
          bgcolor="#1976d2"
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          marginBottom={2}
        >
          <Typography variant={'h2'} color={'white'} textAlign={'center'}>
            Inventory Items
          </Typography>
        </Box>
        <Stack direction={'row'} spacing={4} alignItems={'center'} justifyContent={'center'} marginBottom={'20px'}>
          <Box>
            <TextField
              id="search-bar"
              label="Search Items"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              sx={{ width: '350px'}} 
            />
          </Box>
          <Box>
            <Button variant="contained" onClick={handleOpen}>
              Add New Item
            </Button>
          </Box>
          <Button variant="contained" color="secondary" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Stack>

        <Stack width="1260px" height="375px" spacing={2} overflow={'auto'} paddingX={2}>
          {filteredInventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="93.5%"
              minHeight="110px"
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={'#f0f0f0'}
              paddingX={5}
            >
              <Typography variant={'h6'} color={'#333'} textAlign={'center'} sx={{ fontSize: '20px' }}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
              <Button variant="contained" onClick={() => removeItem(name)}>
                  -
                </Button>
                <Typography
          variant={'h5'}
          color={'#333'}
          textAlign={'center'}
          sx={{ width: '32px', textAlign: 'center' }} 
        >
          {quantity}
        </Typography>
                <Button variant="contained" onClick={() => addItem(name)}>
                  +
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
