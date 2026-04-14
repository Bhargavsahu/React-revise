import { useCallback, useEffect ,useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Btn, Select, RTE } from './Index'
import storeService from '../Appwrite/Config'
import { useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { addPost , updatePost } from '../Store/PostSlice'

function Postform({ post }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, watch, setValue, control, getValues , formState:{ errors } } = useForm({
    defaultValues: {
      Title: post?.Title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active'
    }
  })
  const userData = useSelector(state => state.auth.userData)

  const submit = async (data) => {
    try {
      if (post) {
        const file = data.image?.[0] ? await storeService.UploadFile({ file: data.image[0] }) : null;
        if (file && post.featuredImage) {
          await storeService.DeleteFile({ fileId: post.featuredImage })
        }
        const dbPost = await storeService.UpdatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage
        })
        if (dbPost) {
          const cleanPost = {
            $id: dbPost.$id,
            Title: dbPost.Title,
            slug: dbPost.slug,
            content: dbPost.content,
            featuredImage: dbPost.featuredImage,
            status: dbPost.status,
            userId: dbPost.userId
          }
          dispatch(updatePost(cleanPost))
          navigate(`/post/${dbPost.slug}`)
        }
      } else {
        let file = null;
        if(data.image?.[0]) file = await storeService.UploadFile({ file: data.image[0] });

        const newpost = await storeService.CreatePost({
          ...data,
          featuredImage: file ? file.$id : null,
          userId: userData.$id,
        });

        if (newpost) {
          const cleanPost = {
            $id: newpost.$id,
            Title: newpost.Title,
            slug: newpost.slug,
            content: newpost.content,
            featuredImage: newpost.featuredImage,
            status: newpost.status,
            userId: newpost.userId
          }
          dispatch(addPost(cleanPost))
          navigate(`/post/${newpost.slug}`);
        }

      }
    } catch (error) {
      console.error('post error:', error)
    }
  }

  const slugTransform = useCallback((value) => {
    if(value && typeof value === 'string'){
      const slug = value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')   
      .replace(/^-+|-+$/g, '');
      return slug || 'untitled'
    }
    return 'untitled'
  },[])

  useEffect(() => {
    const subscription = watch((value , {name}) => {
      if(name === 'Title') {
        setValue('slug' , slugTransform(value.Title) , {shouldValidate: true})
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  } , [watch , slugTransform , setValue])

  const imageFile = watch('image')
  const [previewUrl, setpreviewUrl] = useState(null)

  useEffect(() => {
    if(imageFile?.[0]) {
      const url = URL.createObjectURL(imageFile[0])
      setpreviewUrl(url)
       return (() => {
      URL.revokeObjectURL(url)
      })
    }
  } , [imageFile])

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
      <div className='w-2/3 px-2'>
        <Input
          label='title'
          placeholder='Enter your title...'
          type='text'
          className='mb-4'
          {...register('Title' , {
            required: 'Title is required'
          })}
        />
        {errors.Title && (
          <p className='text-red-500 text-sm mb-2'>
            {errors.Title.message}
          </p>
        )}
        <Input
          label='slug'
          placeholder='slug will appear here...'
          type='text'
          readOnly
          className='mb-4'
          {...register('slug' , {
            required:'slug is required'
          })}
        />
        {errors.slug && (
          <p className='text-red-500 text-sm mb-2'>
            {errors.slug.message}
          </p>
        )}
        <RTE label='content : ' name='content' control={control} defaultValue={getValues('content')} />
      </div>
      <div className='w-1/3 px-2'>
          <Input
            label='Image : '
            type='file' 
            className='mb-4'
            accept='image/png, image/jpg, image/jpeg, image/gif'
            {...register('image' , {
              required: !post ? 'image is required' : false
            })}
          />
          {errors.image && (
          <p className='text-red-500 text-sm mb-2'>
            {errors.image.message}
          </p>
          )}
          {
            previewUrl ? (
              <div className='w-full mb-4'>
                <img src={previewUrl} alt={`preview`} className='rounded-lg' />
              </div>
            ) : post?.featuredImage ? (
              <div className='w-full mb-4'>
                <img src={storeService.GetFilePreview(post.featuredImage)} alt="preview" className='rounded-lg' />
              </div>
            ) : null
          }
          <Select
            options = {['active' , 'inactive']}
            label = 'status : '
            className = 'mb-4 outline-1'
            {...register('status' , {
              required: 'status is required'
            })}
          />
          {errors.status && (
          <p className='text-red-500 text-sm mb-2'>
            {errors.status.message}
          </p>
          )}
          <Btn type='submit' className={`w-full rounded-lg px-5 py-2 bg-green-500 hover:bg-green-700 `} >
            {post ? 'Update' : 'Post' }
          </Btn>
      </div>
    </form>
  )
}

export default Postform