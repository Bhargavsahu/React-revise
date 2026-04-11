import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Btn, Select, RTE } from './Index'
import storeService from '../Appwrite/Config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Postform({ post }) {
  const navigate = useNavigate()
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
        if (file) {
          await storeService.DeleteFile({ fileId: post.featuredImage })
        }
        const dbPost = await storeService.UpdatePost(post.slug, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage
        })
        if (dbPost) {
          navigate(`/post/${dbPost.slug}`)
        }
      } else {
        const file = await storeService.UploadFile({ file: data.image[0] });

        if (file) {
          const fileId = file.$id
          data.featuredImage = fileId;
        }

        const newpost = await storeService.CreatePost({
          ...data,
          userId: userData.$id,
        });

        if (newpost) {
          navigate(`/post/${newpost.slug}`);
        }

      }
    } catch (error) {
      console.error('post error:', error)
    }
  }

  const slugTransform = useCallback((value) => {
    if(value && typeof value === 'string'){
      return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')   
      .replace(/^-+|-+$/g, '');
    }
    return ''
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
            post && (
              <div className='w-full mb-4'>
                <img src={storeService.GetFilePreview({fileId: post.featuredImage})} alt={post.Title} className='rounded-lg' />
              </div>
            )
          }
          <Select
            options = {['active' , 'inactive']}
            label = 'status'
            className = 'mb-4'
            {...register('status' , {
              required: 'status is required'
            })}
          />
          {errors.status && (
          <p className='text-red-500 text-sm mb-2'>
            {errors.status.message}
          </p>
          )}
          <Btn type='submit' className='w-full' bgcolor={post ? 'bg-green-500' : undefined }>
            {post ? 'Update' : 'Post' }
          </Btn>
      </div>
    </form>
  )
}

export default Postform